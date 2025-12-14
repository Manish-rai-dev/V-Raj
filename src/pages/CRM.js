import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  CircularProgress,
  Alert,
  Select,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

const CRM = () => {
  const { isAdmin, user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'new',
    notes: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (isAdmin) {
      fetchContacts();
    }
  }, [isAdmin]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const contactsRef = collection(db, 'contacts');
      const q = query(contactsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const contactsData = [];
      querySnapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() });
      });
      
      setContacts(contactsData);
    } catch (err) {
      let errorMessage = 'Failed to fetch contacts: ' + err.message;
      
      if (err.code === 'permission-denied') {
        const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'raimanishkumar52@gmail.com';
        errorMessage = 'Permission denied. Please ensure:\n' +
          `1. You are logged in with ${adminEmail}\n` +
          '2. Firestore security rules are updated in Firebase Console\n' +
          '3. Rules have been published and propagated (wait 10-30 seconds)';
        console.error('❌ Permission Denied Error');
        console.error('Current user:', user?.email);
        console.error('Check Firestore rules in Firebase Console');
      } else if (err.code === 'failed-precondition') {
        errorMessage = 'Index required. Please create the index in Firebase Console or remove orderBy.';
      }
      
      setError(errorMessage);
      console.error('Error fetching contacts:', err);
      console.error('Error code:', err.code);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (contact = null) => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        status: contact.status || 'new',
        notes: Array.isArray(contact.notes) 
          ? contact.notes.map(n => typeof n === 'string' ? n : n.content).join('\n') 
          : contact.notes || '',
        subject: contact.subject || '',
        message: contact.message || '',
      });
      setSelectedContact(contact);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'new',
        notes: '',
        subject: '',
        message: '',
      });
      setSelectedContact(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      const contactData = {
        ...formData,
        notes: formData.notes 
          ? formData.notes.split('\n').filter(n => n.trim()).map(content => ({ 
              content: content.trim(), 
              date: new Date().toISOString() 
            }))
          : [],
        updatedAt: serverTimestamp(),
      };

      if (selectedContact) {
        // Update existing contact
        const contactRef = doc(db, 'contacts', selectedContact.id);
        await updateDoc(contactRef, contactData);
      } else {
        // Create new contact
        contactData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'contacts'), contactData);
      }
      
      await fetchContacts();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save contact: ' + err.message);
      console.error('Error saving contact:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        setError('');
        await deleteDoc(doc(db, 'contacts', id));
        await fetchContacts();
      } catch (err) {
        setError('Failed to delete contact: ' + err.message);
        console.error('Error deleting contact:', err);
      }
    }
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      setError('');
      const contactRef = doc(db, 'contacts', contactId);
      await updateDoc(contactRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
      await fetchContacts();
    } catch (err) {
      setError('Failed to update status: ' + err.message);
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'info',
      contacted: 'warning',
      qualified: 'primary',
      converted: 'success',
      lost: 'error',
    };
    return colors[status] || 'default';
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Admin access required. Please login with an admin account.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customer Relationship Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Contact
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No contacts found. Add your first contact!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              contacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.subject || '-'}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={contact.status || 'new'}
                          onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                          sx={{ 
                            height: 32,
                            '& .MuiSelect-select': {
                              py: 0.5,
                            }
                          }}
                        >
                          <MenuItem value="new">New</MenuItem>
                          <MenuItem value="contacted">Contacted</MenuItem>
                          <MenuItem value="qualified">Qualified</MenuItem>
                          <MenuItem value="converted">Converted</MenuItem>
                          <MenuItem value="lost">Lost</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {Array.isArray(contact.notes) 
                        ? contact.notes.map((n, idx) => (
                            <div key={idx}>{typeof n === 'string' ? n : n.content}</div>
                          ))
                        : contact.notes || '-'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(contact)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedContact ? 'Edit Contact' : 'Add New Contact'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="contacted">Contacted</MenuItem>
              <MenuItem value="qualified">Qualified</MenuItem>
              <MenuItem value="converted">Converted</MenuItem>
              <MenuItem value="lost">Lost</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              margin="normal"
              helperText="Enter multiple notes separated by new lines"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedContact ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CRM;
