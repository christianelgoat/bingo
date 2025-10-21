
import React, { useState, useCallback } from 'react';
import { Quadrant } from './types';
import Header from './components/Header';
import TargetDiagram from './components/TargetDiagram';
import QuadrantSelector from './components/QuadrantSelector';
import Explanation from './components/Explanation';

const App: React.FC = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant>(Quadrant.HV_LP);

  const handleSelectQuadrant = useCallback((quadrant: Quadrant) => {
    setSelectedQuadrant(quadrant);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          <div className="lg:w-1/2 flex justify-center items-center bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <TargetDiagram quadrant={selectedQuadrant} />
          </div>

          <div className="lg:w-1/2 flex flex-col gap-6">
            <QuadrantSelector 
              selectedQuadrant={selectedQuadrant} 
              onSelectQuadrant={handleSelectQuadrant} 
            />
            <Explanation quadrant={selectedQuadrant} />
          </div>

        </div>
        <footer className="text-center text-slate-500 mt-12 text-sm">
          <p>Visualización inspirada en el análisis de exactitud de MVP..</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
