import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Line, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

const VisualisasiGrafik = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Data untuk Grafik Mohr-Coulomb
  const mohrCoulombData = {
    datasets: [
      {
        label: 'Lingkaran Mohr',
        data: [
          { x: 0, y: 0 },
          { x: 50, y: 25 },
          { x: 100, y: 50 },
          { x: 150, y: 75 },
          { x: 200, y: 100 },
          { x: 250, y: 125 },
          { x: 300, y: 150 },
          { x: 350, y: 175 },
          { x: 400, y: 200 }
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 4,
        showLine: false,
      },
      {
        label: 'Garis Kegagalan',
        data: [
          { x: 0, y: 0 },
          { x: 400, y: 200 }
        ],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 0,
        showLine: true,
        borderWidth: 3,
      }
    ]
  };

  const mohrCoulombOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Mohr-Coulomb - Lingkaran Mohr dan Garis Kegagalan',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Tegangan Normal (kPa)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tegangan Geser (kPa)',
        },
      },
    },
  };

  // Data untuk Grafik Triaksial
  const triaksialData = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Deformasi Aksial (%)',
        data: [0, 0.5, 1.2, 2.1, 3.0, 4.2, 5.5, 7.0, 8.8, 10.5, 12.0],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Tegangan Deviator (kPa)',
        data: [0, 50, 120, 180, 220, 250, 270, 280, 285, 290, 295],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.1,
        yAxisID: 'y1',
      }
    ]
  };

  const triaksialOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Triaksial - Deformasi vs Tegangan Deviator',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Waktu (menit)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Deformasi Aksial (%)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Tegangan Deviator (kPa)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Data untuk Grafik Konsolidasi
  const konsolidasiData = {
    labels: ['0', '0.1', '0.25', '0.5', '1', '2', '4', '8', '16', '32', '64'],
    datasets: [
      {
        label: 'Derajat Konsolidasi (%)',
        data: [0, 25, 50, 70, 85, 95, 98, 99, 99.5, 99.8, 99.9],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.1,
      }
    ]
  };

  const konsolidasiOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Konsolidasi - Derajat Konsolidasi vs Waktu',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Waktu (menit)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Derajat Konsolidasi (%)',
        },
        min: 0,
        max: 100,
      },
    },
  };

  // Data untuk Grafik Pemadatan Proctor
  const proctorData = {
    labels: ['12', '14', '16', '18', '20', '22', '24', '26'],
    datasets: [
      {
        label: 'Kepadatan Kering (g/cm³)',
        data: [1.65, 1.78, 1.85, 1.92, 1.95, 1.90, 1.82, 1.70],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        pointRadius: 6,
      }
    ]
  };

  const proctorOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Grafik Pemadatan Proctor - Kadar Air vs Kepadatan Kering',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Kadar Air (%)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Kepadatan Kering (g/cm³)',
        },
        min: 1.6,
        max: 2.0,
      },
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Grafik Mohr-Coulomb
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Menampilkan lingkaran Mohr dan garis kegagalan untuk analisis kekuatan geser tanah
            </Typography>
            <Box sx={{ height: 400 }}>
              <Scatter data={mohrCoulombData} options={mohrCoulombOptions} />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Grafik Triaksial
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Menunjukkan hasil uji triaksial dengan deformasi dan tegangan deviator
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line data={triaksialData} options={triaksialOptions} />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Grafik Konsolidasi
            </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               Menampilkan kurva konsolidasi tanah berdasarkan waktu
             </Typography>
            <Box sx={{ height: 400 }}>
              <Line data={konsolidasiData} options={konsolidasiOptions} />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Grafik Pemadatan Proctor
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Kurva pemadatan Proctor untuk menentukan kadar air optimum
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line data={proctorData} options={proctorOptions} />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Visualisasi Grafik dan Diagram
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="grafik tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Mohr-Coulomb" />
              <Tab label="Triaksial" />
              <Tab label="Konsolidasi" />
              <Tab label="Pemadatan Proctor" />
            </Tabs>
          </Box>
          
          {renderTabContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VisualisasiGrafik;
