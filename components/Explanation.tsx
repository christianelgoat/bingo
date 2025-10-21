
import React from 'react';
import { Quadrant } from '../types';

interface ExplanationProps {
  quadrant: Quadrant;
}

const explanations = {
  [Quadrant.HV_HP]: {
    title: "EXACTO: Alta Veracidad y Alta Precisión",
    diagnosis: "El prototipo resuelve el problema correcto de manera consistente y fiable. La solución es adecuada y la ejecución técnica es robusta.",
    conclusion: "El MVP está listo para escalar. Se ha validado tanto el concepto como la implementación, ofreciendo una experiencia de usuario óptima y cumpliendo sus objetivos de eficiencia y satisfacción."
  },
  [Quadrant.HV_LP]: {
    title: "ESTADO ACTUAL: Alta Veracidad y Baja Precisión",
    diagnosis: "El estado actual del prototipo 'Smart Control Stock' se corresponde con este cuadrante. Los resultados de la validación, especialmente la exitosa reducción de estrés (+0.97), demuestran que el proyecto está apuntando correctamente a las necesidades y 'dolores' del usuario. El concepto de la solución es el adecuado. Sin embargo, la ejecución es inconsistente debido a errores técnicos aleatorios (bugs, lentitud, pérdida de datos), causando una alta dispersión en los resultados de eficiencia y una experiencia de usuario poco fiable.",
    conclusion: "El proyecto no necesita un cambio de dirección (Veracidad), sino una mejora sustancial en la ejecución técnica para agrupar los resultados y reducir la dispersión (Precisión). El objetivo es mover los resultados a 'EXACTO' a través de la corrección de errores y la optimización del rendimiento."
  },
  [Quadrant.LV_HP]: {
    title: "Consistente pero Erróneo: Baja Veracidad y Alta Precisión",
    diagnosis: "El prototipo funciona de manera muy fiable y sin errores técnicos, pero no resuelve el problema real del usuario. Los 'disparos' están agrupados, pero lejos del centro de la diana.",
    conclusion: "Se requiere un pivote estratégico. La base técnica es sólida, pero debe ser redirigida para abordar la necesidad correcta del usuario. Es necesario volver a la fase de investigación y descubrimiento para redefinir el problema a solucionar."
  },
  [Quadrant.LV_LP]: {
    title: "Incorrecto e Inconsistente: Baja Veracidad y Baja Precisión",
    diagnosis: "El prototipo no resuelve el problema correcto y, además, su funcionamiento es errático y poco fiable. Es el peor escenario posible, con recursos invertidos en una dirección equivocada y con una ejecución deficiente.",
    conclusion: "Se necesita una reevaluación fundamental del proyecto. Es crucial detener el desarrollo, analizar las hipótesis iniciales y decidir si vale la pena pivotar o abandonar la iniciativa. Continuar en esta dirección generará más desperdicio."
  }
};

const Explanation: React.FC<ExplanationProps> = ({ quadrant }) => {
  const content = explanations[quadrant];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 flex-grow">
      <h2 className="text-xl font-bold text-slate-800 mb-2">{content.title}</h2>
      <div className="space-y-4 text-slate-600">
        <div>
          <h3 className="font-semibold text-slate-700 mb-1">Diagnóstico Visual:</h3>
          <p className="text-sm md:text-base">{content.diagnosis}</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-700 mb-1">Conclusión del Análisis:</h3>
          <p className="text-sm md:text-base">{content.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default Explanation;
