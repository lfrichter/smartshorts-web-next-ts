import { useState } from 'react';
import { createJobFromJsonUpload, createJobFromPrompt } from '../services/apiService';
import Spinner from './Spinner';

interface JobCreatorProps {
  onJobCreated: (jobId: string) => void;
}

function JobCreator({ onJobCreated }: JobCreatorProps) {
  const [mode, setMode] = useState('prompt');
  const [prompt, setPrompt] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeClasses = 'bg-indigo-600 text-white';
  const inactiveClasses = 'bg-gray-700 hover:bg-gray-600';

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await createJobFromPrompt(prompt);
      onJobCreated(response.jobId);
      setPrompt('');
    } catch (err) {
      setError('Falha ao criar o job. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJsonSubmit = async (event) => {
    event.preventDefault();
    if (!jsonData.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      const rawData = JSON.parse(jsonData);
      let payload;

      // CORREÇÃO 1: Mudar a forma de detectar o formato antigo.
      // Em vez de checar por 'content', checamos por 'prompt_phrase'.
      if (rawData.prompt_phrase) {
        console.log("Detectado formato antigo (pela chave 'prompt_phrase'). Transformando para o novo formato...");

        // CORREÇÃO 2: Usar 'rawData' diretamente, pois não há o aninhamento 'content'.
        const oldData = rawData;

        // O mapeamento continua o mesmo, pois é a lógica de tradução correta.
        payload = {
          title: oldData.prompt_phrase,
          fullText: oldData.speech,
          durationSeconds: oldData.duration_seconds,
          segments: oldData.segments.map(seg => ({
            order: seg.segment_id,
            timeBegin: seg.time_begin,
            timeEnd: seg.time_end,
            subtitle: seg.subtitle,
            imagePrompt: seg.prompt_imagem, // <-- Corrigido o nome da chave aqui também
            movement: seg.movement ? seg.movement.toUpperCase() : 'ZOOM_IN_CENTER',
            verticalOffset: seg.vertical_offset || 0.5
          }))
        };
      } else {
        // Se não tiver 'prompt_phrase', assume que o formato já é o novo.
        console.log("Formato de JSON novo detectado. Enviando diretamente.");
        payload = rawData;
      }

      const response = await createJobFromJsonUpload(payload);
      onJobCreated(response.jobId);
      setJsonData('');
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('O JSON fornecido é inválido.');
      } else {
        console.error(err);
        setError('Falha ao criar o job. Verifique o formato do JSON e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <div className="flex mb-4 border-b border-gray-700">
        <button onClick={() => setMode('prompt')} className={`py-2 px-4 rounded-t-lg font-semibold ${mode === 'prompt' ? activeClasses : inactiveClasses}`}>
          Criar por Prompt
        </button>
        <button onClick={() => setMode('json')} className={`py-2 px-4 rounded-t-lg font-semibold ${mode === 'json' ? activeClasses : inactiveClasses}`}>
          Criar por JSON
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {mode === 'prompt' && (
        <form onSubmit={handlePromptSubmit}>
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Seu Prompt de Comando</label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Uma história sobre a amizade entre um robô e um esquilo."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex justify-center items-center disabled:bg-gray-500" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Gerar Vídeo'}
          </button>
        </form>
      )}

      {mode === 'json' && (
        <form onSubmit={handleJsonSubmit}>
          <div className="mb-4">
            <label htmlFor="jsonData" className="block text-sm font-medium text-gray-300 mb-2">Cole seu Roteiro JSON</label>
            <textarea
              id="jsonData"
              rows="10"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='Cole o conteúdo JSON aqui...'
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
              disabled={isLoading}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex justify-center items-center disabled:bg-gray-500" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Gerar Vídeo por JSON'}
          </button>
        </form>
      )}
    </div>
  );
}

export default JobCreator;
