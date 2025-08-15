import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Tabs, 
  Tab,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  Calculate as CalculateIcon,
  ShowChart as ChartIcon,
  Science as ScienceIcon
} from '@mui/icons-material';

import KalkulatorGeser from './components/KalkulatorGeser';
import VisualisasiGrafik from './components/VisualisasiGrafik';
import SimulatorUji from './components/SimulatorUji';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <KalkulatorGeser />;
      case 1:
        return <VisualisasiGrafik />;
      case 2:
        return <SimulatorUji />;
      default:
        return <KalkulatorGeser />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ScienceIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Analisis Kekuatan Geser Tanah
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="analisis tanah tabs"
              variant="fullWidth"
            >
              <Tab 
                icon={<CalculateIcon />} 
                label="Kalkulator Geser" 
                iconPosition="start"
              />
              <Tab 
                icon={<ChartIcon />} 
                label="Visualisasi Grafik" 
                iconPosition="start"
              />
              <Tab 
                icon={<ScienceIcon />} 
                label="Simulator Uji" 
                iconPosition="start"
              />
            </Tabs>
          </Box>
          
          {renderTabContent()}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
