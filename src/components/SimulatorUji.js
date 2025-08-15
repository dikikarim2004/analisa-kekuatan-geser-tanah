import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  Slider,
  Paper,
  LinearProgress
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

const SimulatorUji = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testData, setTestData] = useState({});
  const [testResults, setTestResults] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setIsRunning(false);
    setProgress(0);
    setTestData({});
    setTestResults({});
  };

  const startTest = () => {
    setIsRunning(true);
    setProgress(0);
    setTestData({});
    setTestResults({});
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          generateTestResults();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateTestResults = () => {
    switch (activeTab) {
      case 0: // Uji Geser Langsung
        generateDirectShearResults();
        break;
      case 1: // Uji Triaksial
        generateTriaxialResults();
        break;
      case 2: // Uji Konsolidasi
        generateConsolidationResults();
        break;
      case 3: // Uji Pemadatan
        generateProctorResults();
        break;
      default:
        break;
    }
  };

  const generateDirectShearResults = () => {
    const normalStresses = [50, 100, 150, 200, 250, 300];
    const shearStresses = normalStresses.map(stress => 
      Math.round(stress * 0.6 + Math.random() * 20)
    );
    
    setTestResults({
      normalStresses,
      shearStresses,
      cohesion: Math.round(shearStresses[0] * 0.8),
      frictionAngle: Math.round(Math.atan((shearStresses[5] - shearStresses[0]) / (normalStresses[5] - normalStresses[0])) * 180 / Math.PI)
    });
  };

  const generateTriaxialResults = () => {
    const triaxialData = {
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
    setTestResults({ triaxialData });
  };

  const generateConsolidationResults = () => {
    const consolidationData = {
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
    setTestResults({ consolidationData });
  };

  const generateProctorResults = () => {
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
    setTestResults({ proctorData });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
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
        title: {
          display: true,
          text: 'Parameter',
        },
      },
    },
  };

  const renderDirectShearTest = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Uji Geser Langsung
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Simulasi pengujian geser langsung untuk menentukan parameter kekuatan geser tanah
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parameter Uji
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Tekanan Normal (kPa)</Typography>
                <Slider
                  value={testData.normalPressure || 100}
                  onChange={(e, value) => setTestData(prev => ({ ...prev, normalPressure: value }))}
                  min={50}
                  max={300}
                  step={10}
                  marks
                  valueLabelDisplay="auto"
                  disabled={isRunning}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                onClick={startTest}
                disabled={isRunning}
                sx={{ mt: 2 }}
              >
                {isRunning ? 'Uji Sedang Berjalan...' : 'Mulai Uji Geser Langsung'}
              </Button>
              
              {isRunning && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Progress: {progress}%
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hasil Uji
              </Typography>
              
              {testResults.normalStresses && (
                <Box>
                  <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                      Kohesi (c)
                    </Typography>
                    <Typography variant="h4">
                      {testResults.cohesion} kPa
                    </Typography>
                  </Paper>
                  
                  <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'secondary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                      Sudut Geser (φ)
                    </Typography>
                    <Typography variant="h4">
                      {testResults.frictionAngle}°
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {testResults.normalStresses && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grafik Hasil Uji Geser Langsung
            </Typography>
            <Box sx={{ height: 400 }}>
              <Scatter 
                data={{
                  datasets: [{
                    label: 'Hasil Uji',
                    data: testResults.normalStresses.map((stress, index) => ({
                      x: stress,
                      y: testResults.shearStresses[index]
                    })),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 6,
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Tegangan Normal vs Tegangan Geser',
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
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderTriaxialTest = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Uji Triaksial
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Simulasi pengujian triaksial untuk analisis kekuatan tanah
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parameter Uji
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Tekanan Sel (kPa)</Typography>
                <Slider
                  value={testData.cellPressure || 100}
                  onChange={(e, value) => setTestData(prev => ({ ...prev, cellPressure: value }))}
                  min={50}
                  max={300}
                  step={10}
                  marks
                  valueLabelDisplay="auto"
                  disabled={isRunning}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                onClick={startTest}
                disabled={isRunning}
                sx={{ mt: 2 }}
              >
                {isRunning ? 'Uji Sedang Berjalan...' : 'Mulai Uji Triaksial'}
              </Button>
              
              {isRunning && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Progress: {progress}%
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hasil Uji
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grafik akan ditampilkan setelah uji selesai
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {!isRunning && progress === 100 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grafik Hasil Uji Triaksial
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line 
                data={testResults.triaxialData || {
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
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Waktu (menit)',
                      },
                    },
                    y: {
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
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderConsolidationTest = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Uji Konsolidasi
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Simulasi pengujian konsolidasi untuk analisis penurunan tanah
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parameter Uji
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Tekanan Beban (kPa)</Typography>
                <Slider
                  value={testData.loadPressure || 100}
                  onChange={(e, value) => setTestData(prev => ({ ...prev, loadPressure: value }))}
                  min={50}
                  max={400}
                  step={25}
                  marks
                  valueLabelDisplay="auto"
                  disabled={isRunning}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                onClick={startTest}
                disabled={isRunning}
                sx={{ mt: 2 }}
              >
                {isRunning ? 'Uji Sedang Berjalan...' : 'Mulai Uji Konsolidasi'}
              </Button>
              
              {isRunning && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Progress: {progress}%
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hasil Uji
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grafik akan ditampilkan setelah uji selesai
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {!isRunning && progress === 100 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grafik Hasil Uji Konsolidasi
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line 
                data={testResults.consolidationData || {
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
                }}
                options={{
                  ...chartOptions,
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
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderProctorTest = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Uji Pemadatan Proctor
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Simulasi pengujian pemadatan Proctor untuk menentukan kadar air optimum
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parameter Uji
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Jumlah Pukulan</Typography>
                <Slider
                  value={testData.blowCount || 25}
                  onChange={(e, value) => setTestData(prev => ({ ...prev, blowCount: value }))}
                  min={15}
                  max={35}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  disabled={isRunning}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                onClick={startTest}
                disabled={isRunning}
                sx={{ mt: 2 }}
              >
                {isRunning ? 'Uji Sedang Berjalan...' : 'Mulai Uji Pemadatan Proctor'}
              </Button>
              
              {isRunning && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={progress} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Progress: {progress}%
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hasil Uji
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grafik akan ditampilkan setelah uji selesai
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {!isRunning && progress === 100 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grafik Hasil Uji Pemadatan Proctor
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line 
                data={testResults.proctorData || {
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
                }}
                options={{
                  ...chartOptions,
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
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderDirectShearTest();
      case 1:
        return renderTriaxialTest();
      case 2:
        return renderConsolidationTest();
      case 3:
        return renderProctorTest();
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Simulator Uji Tanah
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="uji tanah tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Uji Geser Langsung" />
              <Tab label="Uji Triaksial" />
              <Tab label="Uji Konsolidasi" />
              <Tab label="Uji Pemadatan Proctor" />
            </Tabs>
          </Box>
          
          {renderTabContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SimulatorUji;
