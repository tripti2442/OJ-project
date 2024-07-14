import React, { useState, useEffect } from 'react';
import { getQuestion, logout } from '../services/api';
import { Outlet, useNavigate } from 'react-router-dom';

export default function User() {
    const [questions, setQuestions] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getQuestion();
                if (response.problems && response.problems.length > 0) {
                    setQuestions(response.problems);
                } else {
                    setQuestions([]);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setQuestions([]);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logout();
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const openQuestion = (questionId) => {
      
      navigate(`/protected/user/compiler/${questionId}`);
     
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900 h-screen">
            <div className="container my-6 bg-gray-600 p-8 rounded shadow-md">
                <div className='flex justify-between border-double border-b-4 border-white-500 p-4'>
                    <h1 className="text-3xl font-bold mb-4 text-white">User Dashboard</h1>
                    <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mb-4">
                        Logout
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-white pt-4">Questions:</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index} className="my-4 p-4 bg-gray-100 rounded-lg">
                                <p className="mb-2"><strong>Name:</strong> {question.name}</p>
                                <p className="mb-2"><strong>Statement:</strong> {question.statement}</p>
                                <p className="mb-2"><strong>Difficulty:</strong> {question.difficulty}</p>
                                <p className="mb-2"><strong>Topic:</strong> {question.topic}</p>
                                <button  className="bg-yellow-500 text-white p-2 rounded-2xl" onClick={() => openQuestion(question._id)}>Solve</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
           
        </div>
    );
}




/*import React, { useState, useEffect } from 'react';
import { getQuestion, logout } from '../services/api';
import { useNavigate, Outlet } from 'react-router-dom';

export default function User() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("yo");
        const response = await getQuestion();
        console.log(response.problems);
        if (response.problems && response.problems.length > 0) {
          setQuestions(response.problems);
          
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      }
    };

    fetchData();
  }, []);

 
  const handleLogout = async () => {
    try {
      const response = await logout();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openQuestion = (questionId) => {
    navigate(`/protected/user/compiler/${questionId}`);
    <Outlet/>
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 h-screen">
      <div className="container my-6 bg-gray-600 p-8 rounded shadow-md">
        <div className='flex justify-between border-double border-b-4 border-white-500 p-4'>
          <h1 className="text-3xl font-bold mb-4 text-white">User Dashboard</h1>
          <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mb-4">
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white pt-4">Questions:</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="my-4 p-4 bg-gray-100 rounded-lg">
                <p className="mb-2"><strong>Name:</strong> {question.name}</p>
                <p className="mb-2"><strong>Statement:</strong> {question.statement}</p>
               
                <p className="mb-2"><strong>Difficulty:</strong> {question.difficulty}</p>
                <p className="mb-2"><strong>Topic:</strong> {question.topic}</p>
                <a href={`/protected/user/compiler/${question._id}`} className="mb-2">Solve</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
*/
