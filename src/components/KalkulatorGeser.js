import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  Paper
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KalkulatorGeser = () => {
  const [formData, setFormData] = useState({
    kadarAir: '',
    kepadatan: '',
    sudutGeser: '',
    kohesi: '',
    tekananEfektif: ''
  });

  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const hitungKekuatanGeser = () => {
    try {
      const {
        kadarAir,
        kepadatan,
        sudutGeser,
        kohesi,
        tekananEfektif
      } = formData;

      // Validasi input
      if (!kadarAir || !kepadatan || !sudutGeser || !kohesi || !tekananEfektif) {
        setError('Semua parameter harus diisi');
        return;
      }

      const kadarAirNum = parseFloat(kadarAir);
      const kepadatanNum = parseFloat(kepadatan);
      const sudutGeserNum = parseFloat(sudutGeser);
      const kohesiNum = parseFloat(kohesi);
      const tekananEfektifNum = parseFloat(tekananEfektif);

      // Rumus kekuatan geser tanah (Mohr-Coulomb)
      const sudutRad = (sudutGeserNum * Math.PI) / 180;
      const tanPhi = Math.tan(sudutRad);
      
      // Kekuatan geser = c + σ' * tan(φ)
      const kekuatanGeser = kohesiNum + (tekananEfektifNum * tanPhi);
      
      // Faktor keamanan (contoh: berdasarkan standar)
      const faktorKeamanan = kekuatanGeser / (tekananEfektifNum * 0.5);

      setHasil({
        kekuatanGeser: kekuatanGeser.toFixed(2),
        faktorKeamanan: faktorKeamanan.toFixed(2),
        parameter: {
          kadarAir: kadarAirNum,
          kepadatan: kepadatanNum,
          sudutGeser: sudutGeserNum,
          kohesi: kohesiNum,
          tekananEfektif: tekananEfektifNum
        }
      });

      setError('');
    } catch (err) {
      setError('Terjadi kesalahan dalam perhitungan');
    }
  };

  const generateChartData = () => {
    if (!hasil) return null;

    const { parameter } = hasil;
    
    // Data untuk grafik hubungan parameter
    const labels = ['Kadar Air (%)', 'Kepadatan (g/cm³)', 'Sudut Geser (°)', 'Kohesi (kPa)', 'Tekanan Efektif (kPa)'];
    const values = [
      parameter.kadarAir,
      parameter.kepadatan,
      parameter.sudutGeser,
      parameter.kohesi,
      parameter.tekananEfektif
    ];

    return {
      labels,
      datasets: [
        {
          label: 'Parameter Tanah',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grafik Hubungan Parameter Tanah',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Kalkulator Kekuatan Geser Tanah
      </Typography>

      <Grid container spacing={3}>
        {/* Input Parameters */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parameter Input
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kadar Air Tanah (%)"
                    type="number"
                    value={formData.kadarAir}
                    onChange={(e) => handleInputChange('kadarAir', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kepadatan Tanah (g/cm³)"
                    type="number"
                    value={formData.kepadatan}
                    onChange={(e) => handleInputChange('kepadatan', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Sudut Geser Dalam (φ) - derajat"
                    type="number"
                    value={formData.sudutGeser}
                    onChange={(e) => handleInputChange('sudutGeser', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kohesi (c) - kPa"
                    type="number"
                    value={formData.kohesi}
                    onChange={(e) => handleInputChange('kohesi', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tekanan Efektif (σ') - kPa"
                    type="number"
                    value={formData.tekananEfektif}
                    onChange={(e) => handleInputChange('tekananEfektif', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={hitungKekuatanGeser}
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Hitung Kekuatan Geser
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Output Results */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hasil Perhitungan
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              {hasil && (
                <Box>
                  <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                      Kekuatan Geser Tanah
                    </Typography>
                    <Typography variant="h4">
                      {hasil.kekuatanGeser} kPa
                    </Typography>
                  </Paper>
                  
                  <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'secondary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                      Faktor Keamanan
                    </Typography>
                    <Typography variant="h4">
                      {hasil.faktorKeamanan}
                    </Typography>
                  </Paper>
                  
                  <Typography variant="body2" color="text.secondary">
                    * Faktor keamanan > 1.5 dianggap aman untuk konstruksi
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      {hasil && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grafik Hubungan Parameter
            </Typography>
            <Box sx={{ height: 400, mt: 2 }}>
              <Line data={generateChartData()} options={chartOptions} />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default KalkulatorGeser;
