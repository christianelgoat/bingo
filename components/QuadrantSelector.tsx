
import React from 'react';
import { Quadrant } from '../types';

interface QuadrantSelectorProps {
  selectedQuadrant: Quadrant;
  onSelectQuadrant: (quadrant: Quadrant) => void;
}

const quadrants = [
  { id: Quadrant.HV_HP, label: 'Alta Veracidad / Alta Precisión', title: 'Exacto' },
  { id: Quadrant.HV_LP, label: 'Alta Veracidad / Baja Precisión', title: 'Válido pero Inconsistente' },
  { id: Quadrant.LV_HP, label: 'Baja Veracidad / Alta Precisión', title: 'Consistente pero Erróneo' },
  { id: Quadrant.LV_LP, label: 'Baja Veracidad / Baja Precisión', title: 'Incorrecto e Inconsistente' },
];

const QuadrantSelector: React.FC<QuadrantSelectorProps> = ({ selectedQuadrant, onSelectQuadrant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Seleccionar Estado del MVP</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quadrants.map((q) => {
          const isSelected = selectedQuadrant === q.id;
          return (
            <button
              key={q.id}
              onClick={() => onSelectQuadrant(q.id)}
              className={`text-left p-3 rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-105
                ${isSelected 
                  ? 'bg-sky-600 border-sky-700 text-white shadow-md' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-sky-100 hover:border-sky-300'
                }`}
            >
              <span className="font-semibold block">{q.title}</span>
              <span className="text-sm">{q.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuadrantSelector;
