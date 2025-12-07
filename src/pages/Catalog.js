import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Paper,
  Fade,
  Divider,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import HomeIcon from '@mui/icons-material/Home';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import Carousel from 'react-material-ui-carousel';
import virajLocksLogo from '../assets/viraj-locks-logo.jpg';
import { getDirectDriveLink } from '../utils/driveImage';
import { AdvancedImage } from '@cloudinary/react';
import { getProductImage } from '../utils/cloudinary';

const Catalog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const normalizeImageUrl = (url) => {
    if (!url) return url;
    if (url.includes('drive.google.com')) {
      const converted = getDirectDriveLink(url);
      return converted || url;
    }
    return url;
  };

  const fullZincDescription = [
    'Material: Full Zinc',
    'Finish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.'
  ].join('\n');

  const ssPlateDescription = [
    'Material: Satinless Steel',
    'Finish: SS, Antq., B/N Matt',
    'Size: 150, 200, 250mm',
    'Profile: KY, CY & BR'
  ].join('\n');

  const ssRoseDescription = [
    'Material: Satinless Steel',
    'Finish: SS, Antq., B/N Matt'
  ].join('\n');

  const ssRosePvdDescription = [
    'Material: Satinless Steel',
    'Finish: PVD Gold, PVD Rose Gold, SS, Antq., B/N Matt'
  ].join('\n');

  const zincPlateDescription = [
    'Material: SS Plate Zinc Handle',
    'Finish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.',
    'Size: 200mm, 250mm',
    'Profile: KY, CY & BR'
  ].join('\n');

  const rawCatalogData = {
    "brass mortise series": [
      { id: 'JE-702', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895706/502_si5esk.jpg', description: '' },
      { id: 'JE-703', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895705/503_iszmn6.jpg', description: '' },
      { id: 'JE-704', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895705/504_pzsd2h.jpg', description: '' },
      { id: 'JE-705', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895704/505_ue6mmw.jpg', description: '' },
      { id: 'JE-506', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895704/506_ybumsw.jpg', description: '' },
      { id: 'JE-507', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895704/507_pldtgt.jpg', description: '' },
      { id: 'JE-508', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895704/508_xsm3wr.jpg', description: '' },
      { id: 'JE-509', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895703/509_nwl2wj.jpg', description: '' },
      { id: 'JE-510', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895703/510_eygls8.jpg', description: '' },
      { id: 'JE-511', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895703/511_rlkxxw.jpg', description: '' },
      { id: 'JE-512', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895703/512_afwmr9.jpg', description: '' },
      { id: 'JE-513', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895702/513_wvul8a.jpg', description: '' },
    ],
    "door lock": [
      { id: '2in1lock', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895710/2in1lock_rbzquo.jpg', description: '' },
      { id: '6turn1', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895709/6turn1_doqgqg.jpg', description: '' },
      { id: '6turnlock', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895709/6turnlock_qifj2j.jpg', description: '' },
      { id: 'deadlock', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895707/deadlock_wgpcqk.jpg', description: '' },
      { id: 'indicaror', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895708/indicaror_tywzab.jpg', description: '' },
      { id: 'indicatorbolt', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895710/indicatorbolt_d1obwu.jpg', description: '' },
      { id: 'indicatorbolt1', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895709/indicatorbolt1_qkmp5r.jpg', description: '' },
      { id: 'knoblock', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895707/knoblock_an94ku.jpg', description: '' },
      { id: 'multilock', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895709/multilock_mkji42.jpg', description: '' },
      { id: 'nightlatch', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895707/nightlatch_saitrm.jpg', description: '' },
      { id: 'oval6', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895708/oval6_wgei7z.jpg', description: '' },
      { id: 'tribolt', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895706/tribolt_bphm8m.jpg', description: '' },
      { id: 'vertibolt', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895706/vertibolt_lcqu4s.jpg', description: '' },
    ],
    "full zinc mortise rose": [
      { id: 'JE-523', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895714/701_gyyfxj.jpg', description: fullZincDescription },
      { id: 'JE-524', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895714/702_beem8w.jpg', description: fullZincDescription },
      { id: 'JE-525', image: 'https://drive.google.com/file/d/1uMqX0Wl9oQj9Na0A6XrFEHrXzmGVD1wc/view?usp=sharing', description: fullZincDescription },
      { id: 'JE-526', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895714/705_sxekk9.jpg', description: fullZincDescription },
      { id: 'JE-527', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895712/706_u3k2yl.jpg', description: fullZincDescription },
      { id: 'JE-528', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895710/DSC_8761_copy_jbpwga.jpg', description: fullZincDescription },
      { id: 'JE-529', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895712/DSC_8762_copy_rnsckf.jpg', description: fullZincDescription },
      { id: 'JE-530', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895712/DSC_8763_copy_tf1exd.jpg', description: fullZincDescription },
      { id: 'JE-531', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895711/DSC_8764_copy_u60u8j.jpg', description: fullZincDescription },
      { id: 'JE-532', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895712/DSC_8765_copy_ffjjoy.jpg', description: fullZincDescription },
      { id: 'JE-533', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895712/706_u3k2yl.jpg', description: fullZincDescription },
    ],
    "locks": [
      { id: 'BIG_CY', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895768/BIG_CY_j0578j.jpg', description: 'BIG CY (4 Bullets)' },
      { id: 'BABY_LATCH', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895768/Baby_Latch_ldpsf9.jpg', description: 'BABY LATCH' },
      { id: 'KY_70MM', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895767/KY_70mm_n1hf29.jpg', description: 'KY 70mm' },
      { id: 'SMALL_CY', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895767/SMALL_CY_snslkp.jpg', description: 'SMALL CY (3 Bullets)' },
    ],
    "SS Mortise handle on plate": [
      { id: 'JE-101', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895698/JE-101_pirorz.jpg', description: ssPlateDescription },
      { id: 'JE-102', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895698/JE-102_li1zum.jpg', description: ssPlateDescription },
      { id: 'JE-103', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895698/JE-103_e8ti6c.jpg', description: ssPlateDescription },
      { id: 'JE-104', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895697/JE-104_cud4s4.jpg', description: ssPlateDescription },
      { id: 'JE-105', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895696/JE-105_nzgxni.jpg', description: ssPlateDescription },
      { id: 'JE-106', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895693/JE-106_m5iifr.jpg', description: ssPlateDescription },
      { id: 'JE-107', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895695/JE-107_boi0pt.jpg', description: ssPlateDescription },
      { id: 'JE-108', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895693/JE-108_g3hgff.jpg', description: ssPlateDescription },
      { id: 'JE-201', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895701/JE-201_mnmfqb.jpg', description: ssPlateDescription },
      { id: 'JE-201a', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895700/JE-201a_yewysg.jpg', description: ssPlateDescription },
      { id: 'JE-202', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895700/JE-202_owtigc.jpg', description: ssPlateDescription },
      { id: 'JE-203', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895698/JE-203_esjid7.jpg', description: ssPlateDescription },
      { id: 'JE-203a', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895698/JE-203a_slqmyl.jpg', description: ssPlateDescription },
      { id: 'JE-204', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895693/JE-204_seekos.jpg', description: ssPlateDescription },
      { id: 'JE-205', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895692/JE-205_ddtbv3.jpg', description: ssPlateDescription },
      { id: 'JE-206', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895692/JE-206_aqgqxs.jpg', description: ssPlateDescription },
      { id: 'JE-207', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-207_ms45yy.jpg', description: ssPlateDescription },
      { id: 'JE-208', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-208_t9osn6.jpg', description: ssPlateDescription },
      { id: 'JE-209', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895702/JE-502_w7llxo.jpg', description: ssPlateDescription },
      { id: 'JE-210', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895702/JE-503_ieoiq2.jpg', description: ssPlateDescription },
      { id: 'JE-211', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895701/JE-501_cavxsf.jpg', description: ssPlateDescription },
      { id: 'JE-301', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-301_trllhr.jpg', description: ssPlateDescription },
      { id: 'JE-301A', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-301a_vuhllv.jpg', description: ssPlateDescription },
      { id: 'JE-302', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-302_mlhdmw.jpg', description: ssPlateDescription },
      { id: 'JE-302A', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895691/JE-302a_awbbbh.jpg', description: ssPlateDescription },
    ],
    "SS Mortise handle on rose": [
      { id: 'JE-601', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895766/JE-601_r29nqz.jpg', description: ssRoseDescription },
      { id: 'JE-602', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895766/JE-602_vxxdim.jpg', description: ssRoseDescription },
      { id: 'JE-603', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895766/JE-603_wkxjx6.jpg', description: ssRoseDescription },
      { id: 'JE-604', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895765/JE-604_akqcmf.jpg', description: ssRoseDescription },
      { id: 'JE-606', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895765/JE-606_vxpeaf.jpg', description: ssRoseDescription },
      { id: 'JE-608', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895765/JE-608_sytjgq.jpg', description: ssRoseDescription },
      { id: 'JE-605', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895764/JE-605_fttfmh.jpg', description: ssRoseDescription },
      { id: 'JE-607', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895764/JE-607_hqey1b.jpg', description: ssRoseDescription },
      { id: 'JE-609', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895763/DSC_8329_copy_sbphqm.jpg', description: ssRosePvdDescription },
      { id: 'JE-610', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895763/DSC_9333_copy_odwp06.jpg', description: ssRoseDescription },
      { id: 'JE-611', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895763/DSC_8339_copy_qcdtwc.jpg', description: ssRosePvdDescription },
      { id: 'JE-612', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895763/DSC_9332_copy_uaol1r.jpg', description: ssRoseDescription },
      { id: 'JE-613', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895762/DSC_8774_copy_hlaojv.jpg', description: ssRoseDescription },
      { id: 'JE-614', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895762/DSC_8341_copy_lhjygj.jpg', description: ssRoseDescription },
      { id: 'JE-615', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895762/DSC_9331_copy_tn3elv.jpg', description: ssRoseDescription },
      { id: 'JE-616', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895762/DSC_8775_copy_lp3lfz.jpg', description: ssRoseDescription },
      { id: 'JE-617', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895762/DSC_9334_copy_nh2m9n.jpg', description: ssRoseDescription },
      { id: 'JE-618', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895761/DSC_8340_copy_o5jxc8.jpg', description: ssRoseDescription },
      { id: 'JE-619', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895761/DSC_9336_copy_jffwo5.jpg', description: ssRoseDescription },
      { id: 'JE-620', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895760/DSC_9335_copy_wyrypb.jpg', description: ssRoseDescription },
    ],
    "SS Pull handles": [
      { id: 'JE-701', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895778/JE-701_q7s2uv.jpg', description: '' },
      { id: 'JE-702', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895777/JE-702_yqf8r8.jpg', description: '' },
      { id: 'JE-703', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895777/JE-703_zhhhhi.jpg', description: '' },
      { id: 'JE-704', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895777/JE-704_worwgm.jpg', description: '' },
      { id: 'JE-705', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895777/JE-705_nvgbep.jpg', description: '' },
      { id: 'JE-707', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895776/JE-707_s8beyo.jpg', description: '' },
      { id: 'JE-706', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895776/JE-706_yytoqo.jpg', description: '' },
      { id: 'JE-709', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895776/JE-709_bnixjx.jpg', description: '' },
      { id: 'JE-710', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895776/JE-710_cbfi3z.jpg', description: '' },
    ],
    "zinc handle with steel plate": [
      { id: 'JE-501', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895758/DSC_4651_copy_lekegz.jpg', description: zincPlateDescription },
      { id: 'JE-502', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895738/DSC_4652_copy_rxnqtj.jpg', description: zincPlateDescription },
      { id: 'JE-503', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895722/DSC_4655_copy_jw6s2h.jpg', description: zincPlateDescription },
      { id: 'JE-504', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895721/DSC_4653_copy_mem7jt.jpg', description: zincPlateDescription },
      { id: 'JE-505', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895720/DSC_8326_copy_poyck5.jpg', description: zincPlateDescription },
      { id: 'JE-506', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895720/DSC_8333_copy_fcf3lp.jpg', description: zincPlateDescription },
      { id: 'JE-507', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895720/DSC_8324_copy_gw9l3j.jpg', description: zincPlateDescription },
      { id: 'JE-507', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895720/DSC_8337_copy_xnnoiz.jpg', description: zincPlateDescription },
      { id: 'JE-508', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895720/DSC_8332_copy_nqscqs.jpg', description: zincPlateDescription },
      { id: 'JE-509', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895719/DSC_8338_copy_lwmh82.jpg', description: zincPlateDescription },
      { id: 'JE-510', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895719/DSC_8325_copy_y3u4i6.jpg', description: zincPlateDescription },
      { id: 'JE-511', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895718/DSC_8336_copy_mjbyrc.jpg', description: zincPlateDescription },
      { id: 'JE-512', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895718/DSC_8330_copy_lchhoi.jpg', description: zincPlateDescription },
      { id: 'JE-513', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895718/DSC_8328_copy_sz6uvp.jpg', description: zincPlateDescription },
      { id: 'JE-514', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895717/DSC_8331_copy_j5qcza.jpg', description: zincPlateDescription },
      { id: 'JE-515', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895717/DSC_8334_copy_eqc4vr.jpg', description: zincPlateDescription },
      { id: 'JE-516', image: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895717/DSC_8769_copy_gwuuhn.jpg', description: zincPlateDescription },
    ],
  };

  const catalogData = Object.keys(rawCatalogData).reduce((acc, category) => {
    acc[category] = rawCatalogData[category].map((item) => ({
      ...item,
      image: normalizeImageUrl(item.image),
      description: item.description ? item.description.trim() : '',
    }));
    return acc;
  }, {});

  const driveFiles = Object.keys(catalogData);
  const [selectedDriveFile, setSelectedDriveFile] = useState(driveFiles[0] || '');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const productImages = Object.keys(catalogData).reduce((acc, category) => {
    const images = catalogData[category]
      .map((item) => item.image)
      .filter((image) => Boolean(image) && !image.includes('YOUR_'));
    if (images.length > 0) {
      acc[category] = images;
    }
    return acc;
  }, {});

  const productIdMap = Object.keys(catalogData).reduce((acc, category) => {
    acc[category] = catalogData[category].map((item) => item.id || null);
    return acc;
  }, {});

  const productDescriptionMap = Object.keys(catalogData).reduce((acc, category) => {
    acc[category] = catalogData[category].map((item) => item.description || '');
    return acc;
  }, {});


  const handleProductClick = (imageSource, categoryName, productId, description, isCloudinary) => {
    setSelectedProduct({
      image: imageSource,
      name: categoryName,
      productId: productId,
      category: categoryName,
      isCloudinary: isCloudinary,
      description: description || `${categoryName} - Product ID: ${productId || 'N/A'}`
    });
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };



  // Helper function to render a product card
  // Supports both Cloudinary public IDs and regular image URLs
  const renderProductCard = (imageSource, categoryName, idx, productId, description, isCloudinary = true) => {
    const cardContent = (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 8,
          },
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: isMobile ? '100%' : '100%',
          mx: isMobile ? 'auto' : 0,
          my: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 280,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {isCloudinary && imageSource ? (
            <AdvancedImage
              cldImg={getProductImage(imageSource, 800, 600)}
              alt={`${categoryName} - Image ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          ) : (
            <CardMedia
              component="img"
              image={imageSource}
              alt={`${categoryName} - Image ${idx + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
              }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%' }}>
            {categoryName.toLowerCase().includes('lock') ? (
              <LockIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
            ) : categoryName.toLowerCase().includes('mortise') ? (
              <SecurityIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
            ) : categoryName.toLowerCase().includes('home') ? (
              <HomeIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
            ) : (
              <InfoIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
            )}
          </Box>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              width: '100%',
              mb: 1,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {categoryName}
          </Typography>
          {productId && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              Product ID: {productId}
            </Typography>
          )}
          <Divider sx={{ mb: 1, mt: 'auto' }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ borderRadius: 2, fontWeight: 500, px: 2, boxShadow: 1, transition: 'all 0.2s', '&:hover': { boxShadow: 3 } }}
              onClick={() => handleProductClick(imageSource, categoryName, productId, description, isCloudinary)}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    );

    return cardContent;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflowX: 'hidden', width: '100%' }}>
      {/* Business Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <img src={virajLocksLogo} alt="V-Raj Locks Logo" style={{ height: '60px', marginRight: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }} gutterBottom>
            Product Catalog
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Explore our premium range of locks and security solutions
          </Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Paper elevation={3} sx={{ mb: 4, p: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'center' } }}>
              <Autocomplete
                freeSolo
                options={driveFiles}
                value={selectedDriveFile}
                inputValue={searchQuery}
                onInputChange={(event, newInputValue) => {
                  setSearchQuery(newInputValue);
                  const match = driveFiles.find(file =>
                    file.toLowerCase().includes(newInputValue.toLowerCase())
                  );
                  if (match) {
                    setSelectedDriveFile(match);
                  }
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSelectedDriveFile(newValue);
                    setSearchQuery(newValue);
                    setShowAllCategories(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Products"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                sx={{ flex: 1, minWidth: { xs: '100%', md: 350, lg: 450 }, maxWidth: 600 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
              <Button
                variant={showAllCategories ? "contained" : "outlined"}
                onClick={() => {
                  setShowAllCategories(!showAllCategories);
                  if (!showAllCategories) {
                    setSelectedDriveFile('');
                  }
                }}
                sx={{ borderRadius: 2 }}
              >
                {showAllCategories ? 'Show Selected' : 'Show All Categories'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Grid */}
      <Grid container spacing={4} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
        {showAllCategories ? (
          // Show all categories with their images
          Object.keys(productImages).length > 0 ? (
            Object.keys(productImages).map((categoryName, categoryIdx) => (
            <React.Fragment key={categoryName}>
              {productImages[categoryName].length > 0 && (
                <Grid item xs={12} sx={{ mt: categoryIdx > 0 ? 4 : 0 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categoryName.toLowerCase().includes('lock') ? (
                      <LockIcon />
                    ) : categoryName.toLowerCase().includes('mortise') ? (
                      <SecurityIcon />
                    ) : categoryName.toLowerCase().includes('home') ? (
                      <HomeIcon />
                    ) : (
                      <InfoIcon />
                    )}
                    {categoryName}
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
              )}
              {isMobile ? (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: '100%' }}>
                    <Carousel
                      autoPlay={false}
                      animation="slide"
                      indicators={true}
                      navButtonsAlwaysVisible={true}
                      sx={{
                        width: '100%',
                        '& .CarouselItem': {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      }}
                    >
                      {productImages[categoryName].map((imageSource, idx) => {
                        const productId = productIdMap[categoryName] && productIdMap[categoryName][idx] ? productIdMap[categoryName][idx] : null;
                        const description = productDescriptionMap[categoryName] && productDescriptionMap[categoryName][idx] ? productDescriptionMap[categoryName][idx] : '';
                        // Check if it's a full Cloudinary URL or a public ID
                        const isFullUrl = imageSource && imageSource.startsWith('http');
                        const isCloudinary = !isFullUrl;
                        return (
                          <Box key={`${categoryName}-${idx}`} sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Box sx={{ width: '100%', maxWidth: '100%' }}>
                              {renderProductCard(imageSource, categoryName, idx, productId, description, isCloudinary)}
                            </Box>
                          </Box>
                        );
                      })}
                    </Carousel>
                  </Box>
                </Grid>
              ) : (
                productImages[categoryName].map((imageSource, idx) => {
                  const productId = productIdMap[categoryName] && productIdMap[categoryName][idx] ? productIdMap[categoryName][idx] : null;
                  const description = productDescriptionMap[categoryName] && productDescriptionMap[categoryName][idx] ? productDescriptionMap[categoryName][idx] : '';
                  // Check if it's a full Cloudinary URL or a public ID
                  const isFullUrl = imageSource && imageSource.startsWith('http');
                  const isCloudinary = !isFullUrl;
                  return (
                    <Fade in timeout={600 + (categoryIdx * 100 + idx * 200)} key={`${categoryName}-${idx}`}>
                      <Grid item xs={12} sm={6} md={4}>
                        {renderProductCard(imageSource, categoryName, idx, productId, description, isCloudinary)}
                      </Grid>
                    </Fade>
                  );
                })
              )}
            </React.Fragment>
          ))
          ) : (
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No images available
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  To add images, upload them to Cloudinary and update the catalogData mapping with the new entries.
                </Typography>
              </Paper>
            </Grid>
          )
        ) : (
          // Show images for selected category
          (productImages[selectedDriveFile] || []).length > 0 ? (
            isMobile ? (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
                  <Carousel
                    autoPlay={false}
                    animation="slide"
                    indicators={true}
                    navButtonsAlwaysVisible={true}
                    sx={{
                      width: '100%',
                      '& .CarouselItem': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  >
                    {(productImages[selectedDriveFile] || []).map((imageSource, idx) => {
                      const productId = productIdMap[selectedDriveFile] && productIdMap[selectedDriveFile][idx] ? productIdMap[selectedDriveFile][idx] : null;
                      const description = productDescriptionMap[selectedDriveFile] && productDescriptionMap[selectedDriveFile][idx] ? productDescriptionMap[selectedDriveFile][idx] : '';
                      // Check if it's a full Cloudinary URL or a public ID
                      const isFullUrl = imageSource && imageSource.startsWith('http');
                      const isCloudinary = !isFullUrl;
                      return (
                        <Box key={idx} sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 2 }}>
                          <Box sx={{ width: '100%', maxWidth: '100%' }}>
                            {renderProductCard(imageSource, selectedDriveFile, idx, productId, description, isCloudinary)}
                          </Box>
                        </Box>
                      );
                    })}
                  </Carousel>
                </Box>
              </Grid>
            ) : (
              (productImages[selectedDriveFile] || []).map((imageSource, idx) => {
                const productId = productIdMap[selectedDriveFile] && productIdMap[selectedDriveFile][idx] ? productIdMap[selectedDriveFile][idx] : null;
                const description = productDescriptionMap[selectedDriveFile] && productDescriptionMap[selectedDriveFile][idx] ? productDescriptionMap[selectedDriveFile][idx] : '';
                // Check if it's a full Cloudinary URL or a public ID
                const isFullUrl = imageSource && imageSource.startsWith('http');
                const isCloudinary = !isFullUrl;
                return (
                  <Fade in timeout={600 + idx * 200} key={idx}>
                    <Grid item xs={12} sm={6} md={4}>
                      {renderProductCard(imageSource, selectedDriveFile, idx, productId, description, isCloudinary)}
                    </Grid>
                  </Fade>
                );
              })
            )
          ) : (
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {selectedDriveFile ? `No images available for "${selectedDriveFile}"` : 'Please select a category to view images'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {selectedDriveFile && 'To add images, upload them to Cloudinary and extend the catalogData mapping with the new entries.'}
                </Typography>
              </Paper>
            </Grid>
          )
        )}
      </Grid>

      {/* Product Detail Dialog */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 2 } }}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
              <InfoIcon color="primary" sx={{ mr: 1 }} />
              {selectedProduct.name}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 1, borderRadius: 2, mb: 2, overflow: 'hidden', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedProduct.image ? (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', borderRadius: 8 }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Image not available
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                  </Box>
                  <Typography paragraph>
                    {selectedProduct.description}
                  </Typography>
                  {selectedProduct.productId && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Product ID: {selectedProduct.productId}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 2 }}>
                    <PriceCheckIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Pricing & Stock
                    </Typography>
                  </Box>
                  <Typography paragraph sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    For pricing and stock, please contact us
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleCloseDialog();
                  const message = selectedProduct.productId 
                    ? `hey, i have enquiry regarding the ${selectedProduct.productId}`
                    : `hey, i have enquiry regarding the ${selectedProduct.name}`;
                  navigate('/contact', { state: { prefillMessage: message } });
                }}
              >
                Contact for Inquiry
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Catalog; 