import React, { useState, useEffect } from 'react';
import '../App.css';
import { compile } from '../services/api';
import { useParams } from 'react-router-dom';
import { getQuestion, getTestcases } from '../services/api';

function Compiler() {
  
  const { questionId } = useParams();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [question, setQuestion] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [verdict, setVerdict] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    console.log("compiler mein hu mein");
    const fetchTestcases = async () => {
      try {
        const response = await getTestcases(questionId);
        setTestCases(response.testcases); 
      } catch (error) {
        console.error('Error fetching test cases:', error);
      }
    };

    const fetchQuestion = async () => {
      try {
        const response = await getQuestion(questionId);
        setQuestion(response.problems[0]);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    if (questionId) {
      fetchQuestion();
      fetchTestcases();
    }
  }, [questionId]);

  const handleCompile = async () => {
    try {
      const response = await compile(language, code, input);
      console.log('Compilation response:', response);
      setOutput(response);
    } catch (error) {
      console.error('Compilation error:', error);
      setOutput('Compilation failed. Check console for error details.');
    }
  };

  const handleSubmit = async () => {
    try {
      let allVerdicts = [];
      let cnt = 0;

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const response = await compile(language, code, testCase.input);
        console.log(`Test Case ${i + 1} response:`, response);
        const testCaseVerdict = response === testCase.expectedOutput ? 'Passed' : 'Failed';
        if (testCaseVerdict === 'Passed') {
          cnt++;
        }
        allVerdicts.push(`Test Case ${i + 1}: ${testCaseVerdict}`);
      }

      if (cnt === allVerdicts.length) {
        setResult('Success');
      } else {
        setResult('Fail');
      }
      setVerdict(allVerdicts.join('\n'));

    } catch (error) {
      console.error('Compilation error:', error);
      setVerdict('Compilation failed. Check console for error details.');
    }
  };

  return (
    <div className='flex justify-between bg-gray-900 p-8 gap-6'>
      <div className='w-1/2 p-6 bg-white'>
        {question && (
          <div>
            <div className='flex gap-x-96'>
              <h1 className='font-bold'>{question.name}</h1>
              <pre className='ml-24 text-yellow-500'>{question.difficulty}</pre>
            </div>
            <p>{question.statement}</p>
          </div>
        )}
        {testCases.length > 0 && (
          <div>
            <h2 className='font-bold mt-4'>Test Cases</h2>
            {testCases.map((testCase, index) => (
              <div key={index} className='mb-4'>
                <h3 className='font-bold'>Test Case {index + 1}</h3>
                <div><strong>Input:</strong> {testCase.input}</div>
                <div><strong>Expected Output:</strong> {testCase.expectedOutput}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="Compiler w-1/2 ml-auto bg-slate-600 p-4 rounded-2xl">
        <div className="controls">
          <label htmlFor="language-select" className='text-white'>Choose a language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>
        <div className="code-editor">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            className='h-96 p-4 bg-slate-300'
          ></textarea>
        </div>
        <div className="input-editor h-24">
          <h2 className='text-white'>Input Test Cases</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your test cases here..."
            className='h-12'
          ></textarea>
        </div>
        <button onClick={handleCompile} className='bg-white p-2 rounded-2xl'>Compile</button>
        <div className="output ml-20 w-4/5">
          <h2 className='text-white'>Output</h2>
          <pre>{output}</pre>
        </div>
        <button onClick={handleSubmit} className='bg-white p-2 rounded-2xl mt-4'>Submit</button>
        <div className="output ml-20 w-4/5">
          <h2 className='text-white'>Verdict</h2>
          <pre>{verdict}</pre>
        </div>
        <div className="result ml-20 w-4/5">
          <h2 className='text-white'>Result</h2>
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
}

export default Compiler;










/*import React, { useState, useEffect } from 'react';
import '../App.css';
import { compile } from '../services/api';
import { useParams } from 'react-router-dom';
import { getQuestion, getTestcases } from '../services/api';

function Compiler() {
  const { questionId } = useParams();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [question, setQuestion] = useState(null);
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const fetchTestcases = async () => {
      console.log(questionId);
      try {
        const response = await getTestcases(questionId);
        setTestCases(response.testcases[0]); // Assuming testCases are nested within the first problem in the response
      } catch (error) {
        console.error('Error fetching test cases:', error);
      }
    };

    const fetchQuestion = async () => {
      try {
        const response = await getQuestion(questionId);
        setQuestion(response.problems[0]);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    if (questionId) {
      fetchQuestion();
      fetchTestcases();
    }
  }, [questionId]);

  const handleCompile = async () => {
    try {
      const response = await compile(language, code, input);
      console.log('Compilation response:', response);
      setOutput(response);
    } catch (error) {
      console.error('Compilation error:', error);
      setOutput('Compilation failed. Check console for error details.');
    }
  };

  return (
    <div className='flex justify-between bg-gray-900 p-8 gap-6'>
      <div className='w-1/2 p-6 bg-white'>
        {question && (
          <div>
            <div className='flex gap-x-96'><h1 className=' font-bold'>{question.name}</h1><pre className='ml-24 text-yellow-500'>{question.difficulty}</pre></div>
            <p>{question.statement}</p>
          </div>
        )}
        {testCases.length > 0 && (
          <div>
            <h2 className='font-bold mt-4'>Test Cases</h2>
            {testCases.map((testCase, index) => (
              <div key={index} className='mb-4'>
                <h3 className='font-bold'>Test Case {index + 1}</h3>
                <div><strong>Input:</strong> {testCase.input}</div>
                <div><strong>Expected Output:</strong> {testCase.expectedOutput}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="Compiler w-1/2 ml-auto bg-slate-600 p-4 rounded-2xl">
        <div className="controls">
          <label htmlFor="language-select" className='text-white'>Choose a language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>
        <div className="code-editor ">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            className='h-96 p-4 bg-slate-300'
          ></textarea>
        </div>
        <div className="input-editor h-24">
          <h2 className='text-white'>Input Test Cases</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your test cases here..."
            className='h-12'
          ></textarea>
        </div>
        <button onClick={handleCompile} className='bg-white p-2 rounded-2xl'>Compile</button>
        <div className="output ml-20 w-4/5">
          <h2 className='text-white'>Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default Compiler;*/
