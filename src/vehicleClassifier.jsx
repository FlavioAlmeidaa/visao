import React, { useState } from 'react';
import axios from 'axios';

const VehicleClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configurações da sua API do Custom Vision
  const PREDICTION_ENDPOINT = 'sua-url-da-api';
  const PREDICTION_KEY = 'sua-chave-de-predição';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPrediction(null);
    setError(null);

    // Criar URL de pré-visualização
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione uma imagem primeiro.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('imageFile', selectedFile);
  
    try {
      const response = await axios.post(
        PREDICTION_ENDPOINT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Prediction-Key': PREDICTION_KEY
          }
        }
      );
  
      // Ordena as predições por probabilidade (da mais alta para a mais baixa)
      const sortedPredictions = response.data.predictions.sort((a, b) => b.probability - a.probability);
      
      setPrediction({
        topPrediction: sortedPredictions[0],
        allPredictions: sortedPredictions
      });
    } catch (error) {
      console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
      setError('Erro ao consultar a API do Custom Vision: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Classificador de Veículos</h2>
      
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full p-2 border rounded"
      />
      
      {imagePreview && (
        <div className="mb-4 flex justify-center">
          <img 
            src={imagePreview} 
            alt="Pré-visualização" 
            className="max-w-full h-48 object-cover rounded"
          />
        </div>
      )}
      
      <button 
        onClick={uploadImage}
        disabled={!selectedFile || loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? 'Processando...' : 'Classificar Veículo'}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3 className="font-bold text-lg mb-2">Resultado da Classificação:</h3>
          <p className="mb-2">
            <strong>Tipo de Veículo:</strong> {prediction.topPrediction.tagName}
          </p>
          <p>
            <strong>Probabilidade:</strong> {(prediction.topPrediction.probability * 100).toFixed(2)}%
          </p>

          {prediction.allPredictions.length > 1 && (
            <div className="mt-4">
              <h4 className="font-semibold">Outras Probabilidades:</h4>
              <ul>
                {prediction.allPredictions.slice(1).map((pred, index) => (
                  <li key={index} className="text-sm">
                    {pred.tagName}: {(pred.probability * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleClassifier;