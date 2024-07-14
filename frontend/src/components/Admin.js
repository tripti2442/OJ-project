import React, { useState, useEffect, useReducer } from 'react';
import { addQuestion, updateQuestion, getQuestion, deleteQuestion, logout, uploadTestCase, getTestcases } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [newQuestion, setNewQuestion] = useState({
        statement: '',
        name: '',
        difficulty: '',
        topic: '',
    });
    const [editQuestion, setEditQuestion] = useState(null);
    const [testCaseInput, setTestCaseInput] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [expectedOutput, setExpectedOutput] = useState('');

    useEffect(() => {
        fetchQuestions();
        if (editQuestion) {

            fetchTestCases(editQuestion._id);
        }
    }, [ignored, editQuestion]);

    const fetchQuestions = async () => {
        try {
            const response = await getQuestion();
            if (response && response.problems && response.problems.length > 0) {
                setQuestions(response.problems);
            } else {
                setQuestions([]);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]);
        }
    };

    const handleAddQuestion = async () => {
        try {
            const response = await addQuestion(newQuestion);
            window.location.reload();
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleUpdateQuestion = async () => {
        try {
            const updatedQuestion = {
                ...editQuestion,
                testCases: editQuestion.testCases ? [...editQuestion.testCases] : [],
            };
            const response = await updateQuestion(updatedQuestion);
            if (response.status === 200) {
                setEditQuestion(null);

                fetchQuestions();
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const fetchTestCases = async (id) => {
        try {
            const response = await getTestcases(id);
            if (response && response.testcases && response.testcases.length > 0) {
                setTestCases(response.testcases);
            } else {
                setTestCases([]);
            }
        } catch (error) {
            console.error('Error fetching testcases:', error);
            setTestCases([]);
        }
    }

    const handleAddTestCase = async () => {
        try {
            const response = await uploadTestCase(editQuestion._id, testCaseInput, expectedOutput);
            console.log(response);
            // Assuming you want to refresh the questions list after uploading a test case
            fetchQuestions();
        } catch (error) {
            console.error('Error uploading test case:', error);
        }
    };

    const handleDeleteQuestion = async (_id) => {
        try {
            const response = await deleteQuestion(_id);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout();
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };



    return (
        
        <div className="bg-gray-900 min-h-screen py-4 px-24">
            <div className='text-white font-bold'>REFRESH TO VIEW THE CHANGES</div>
            <div className="container my-6 bg-gray-600 p-10 rounded shadow-md">
                <div className='flex justify-between border-double border-b-4 border-white-500 p-4'>
                    <h1 className="text-white text-3xl font-bold mb-4">Admin Dashboard</h1>
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
                            Logout
                        </button>
                    </div>
                </div>
                <div className='flex p-4 gap-4'>
                    <div className="mb-8 w-1/2">
                        {!editQuestion && (
                            <div className='flex flex-col'>
                                <div className="flex flex-col md:flex-wrap mb-4">
                                    <h2 className="text-xl font-bold mb-2 text-white">Add Question</h2>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newQuestion.name}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, name: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <textarea
                                        placeholder="Statement"
                                        value={newQuestion.statement}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, statement: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                        rows="2"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Difficulty"
                                        value={newQuestion.difficulty}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Topic"
                                        value={newQuestion.topic}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <button onClick={handleAddQuestion} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        )}
                        {editQuestion && (
                            <div className="mb-8">
                                <div className="flex flex-col md:flex-wrap mb-4">
                                    <h2 className="text-white text-xl font-bold mb-2">Edit Question</h2>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={editQuestion.name}
                                        onChange={(e) => setEditQuestion({ ...editQuestion, name: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <textarea
                                        placeholder="Statement"
                                        value={editQuestion.statement}
                                        onChange={(e) => setEditQuestion({ ...editQuestion, statement: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                        rows="2"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Difficulty"
                                        value={editQuestion.difficulty}
                                        onChange={(e) => setEditQuestion({ ...editQuestion, difficulty: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Topic"
                                        value={editQuestion.topic}
                                        onChange={(e) => setEditQuestion({ ...editQuestion, topic: e.target.value })}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <button onClick={handleUpdateQuestion} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                                        Update Question
                                    </button>
                                </div>
                            </div>
                        )}
                        {editQuestion && (
                            <div className="mb-8">
                                <div className="flex flex-col md:flex-wrap mb-4">
                                    <h2 className="text-white text-xl font-bold mb-2">Add Test Case</h2>
                                    <input
                                        type="text"
                                        placeholder="Input"
                                        value={testCaseInput}
                                        onChange={(e) => setTestCaseInput(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Expected Output"
                                        value={expectedOutput}
                                        onChange={(e) => setExpectedOutput(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-md mb-2"
                                    />
                                    <button onClick={handleAddTestCase} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                                        Add Test Case
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Display Existing Questions */}
                    <div className='w-1/2'>
                        <h2 className="text-xl font-bold mb-2 text-white">Questions</h2>
                        {questions.map((question) => (
                            <div key={question._id} className="border border-gray-300 p-4 rounded-md mb-4">
                                <p className="mb-2"><strong>Name:</strong> {question.name}</p>
                                <p className="mb-2"><strong>Statement:</strong> {question.statement}</p>
                                <p className="mb-2"><strong>Difficulty:</strong> {question.difficulty}</p>
                                <p className="mb-2"><strong>Topic:</strong> {question.topic}</p>
                                <div className="flex mt-2">
                                    <button onClick={() => setEditQuestion(question)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteQuestion(question._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2">
                                        Delete
                                    </button>
                                    <button onClick={() => setEditQuestion(question)} className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md">
                                        Add Testcases
                                    </button>
                                </div>
                                {/* Display Test Cases */}
                                {/* Display Test Cases */}
                                {editQuestion && editQuestion._id === question._id && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold mb-2">Test Cases</h3>
                                        {testCases.length > 0 ? (
                                            testCases.map((testCase, index) => (
                                                <div key={index} className="border border-gray-300 p-2 rounded-md mb-2">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <strong>Input:</strong> {testCase.input}
                                                        </div>
                                                        <div>
                                                            <strong>Expected Output:</strong> {testCase.expectedOutput}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No test cases available.</p>
                                        )}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}





/*import React, { useState, useEffect, useReducer } from 'react';
import { addQuestion, updateQuestion, getQuestion, deleteQuestion, logout } from '../services/api';
import { Navigate , Link , useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [ignored,forceUpdate] = useReducer(x=>x+1,0);
    const [newQuestion, setNewQuestion] = useState({
        statement: '',
        name: '',
        code: '',
        difficulty: '',
        topic: ''
    });
    const [editQuestion, setEditQuestion] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, [ignored]);

    const fetchQuestions = async () => {
        try {
            const response = await getQuestion();
            if (response && response.problems && response.problems.length > 0) {
                setQuestions(response.problems); // Update questions state with response.problems
            } else {
                setQuestions([]); // Set questions to empty array if no problems found
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]); // Handle error by setting questions to empty array
        }
    };

    const handleAddQuestion = async () => {
        try {
            const response = await addQuestion(newQuestion);
            window.location.reload();
            setNewQuestion({
                statement: '',
                name: '',
                code: '',
                difficulty: '',
                topic: ''
            });
            fetchQuestions();
            forceUpdate();
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleUpdateQuestion = async () => {
        try {
            const response = await updateQuestion(editQuestion);
            if (response.status === 200) {
                setEditQuestion(null);
                fetchQuestions();
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleDeleteQuestion = async (_id) => {
        try {
            const response = await deleteQuestion(_id);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout();
            localStorage.clear();
            navigate('/login');
            // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen py-4 px-24">
            <div className="container  my-6  bg-gray-600 p-10 rounded shadow-md">
                <div className='flex justify-between border-double border-b-4 border-white-500 p-4'>
                <h1 className="text-white  text-3xl font-bold mb-4">Admin Dashboard</h1>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
                        Logout
                    </button>
                </div>
                
                </div >
                <div className='flex p-4 gap-4'>
                <div className="mb-8  w-1/2">
                    {!editQuestion &&(
                    <div className='flex flex-col'>
                    
                    <div className="flex flex-col md:flex-wrap  mb-4">
                    <h2 className="text-xl font-bold mb-2 text-white ">Add Question</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newQuestion.name}
                            onChange={(e) => setNewQuestion({ ...newQuestion, name: e.target.value })}
                            className="border border-gray-300 p-2 rounded-md mb-2  "
                        />
                        <textarea
                            placeholder="Statement"
                            value={newQuestion.statement}
                            onChange={(e) => setNewQuestion({ ...newQuestion, statement: e.target.value })}
                            className="border border-gray-300 p-2 rounded-md mb-2 "
                            rows="2"
                        />
                        <textarea
                            placeholder="Code"
                            value={newQuestion.code}
                            onChange={(e) => setNewQuestion({ ...newQuestion, code: e.target.value })}
                            className="border border-gray-300 p-2 rounded-md mb-2 "
                            rows="2"
                        />
                        <input
                            type="text"
                            placeholder="Difficulty"
                            value={newQuestion.difficulty}
                            onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                            className="border border-gray-300 p-2 rounded-md mb-2 "
                        />
                        <input
                            type="text"
                            placeholder="Topic"
                            value={newQuestion.topic}
                            onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                            className="border border-gray-300 p-2 rounded-md mb-2 "
                        />
                        <button onClick={handleAddQuestion} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md  ">
                            Add Question
                        </button>
                    </div>
                </div> )}
                {editQuestion && (
                    <div className="mb-8 ">
                        
                        <div className="flex flex-col md:flex-wrap  mb-4">
                        <h2 className="text-xl font-bold mb-2">Edit Question</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editQuestion.name}
                                onChange={(e) => setEditQuestion({ ...editQuestion, name: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md mb-2 "
                            />
                            <textarea
                                placeholder="Statement"
                                value={editQuestion.statement}
                                onChange={(e) => setEditQuestion({ ...editQuestion, statement: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md mb-2 "
                                rows="2"
                            />
                            <textarea
                                placeholder="Code"
                                value={editQuestion.code}
                                onChange={(e) => setEditQuestion({ ...editQuestion, code: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md mb-2 "
                                rows="2"
                            />
                            <input
                                type="text"
                                placeholder="Difficulty"
                                value={editQuestion.difficulty}
                                onChange={(e) => setEditQuestion({ ...editQuestion, difficulty: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md mb-2  "
                            />
                            <input
                                type="text"
                                placeholder="Topic"
                                value={editQuestion.topic}
                                onChange={(e) => setEditQuestion({ ...editQuestion, topic: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md mb-2 "
                            />
                            <button onClick={handleUpdateQuestion} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md ">
                                Update Question
                            </button>
                        </div>
                    </div>
                )}
                
                </div>
                <div className='w-1/2'>
                    <h2 className="text-xl font-bold mb-2 text-white ">Questions</h2>
                    {questions.map((question) => (
                        <div key={question._id} className="border border-gray-300 p-4 rounded-md mb-4">
                            <p className="mb-2"><strong>Name:</strong> {question.name}</p>
                            <p className="mb-2"><strong>Statement:</strong> {question.statement}</p>
                            <p className="mb-2"><strong>Code:</strong> {question.code}</p>
                            <p className="mb-2"><strong>Difficulty:</strong> {question.difficulty}</p>
                            <p className="mb-2"><strong>Topic:</strong> {question.topic}</p>
                            <div className="flex mt-2">
                                <button onClick={() => setEditQuestion(question)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteQuestion(question._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                </div>

              
            </div>
        </div>
    );
}






import { login } from '../services/api';

export default function Admin() {
  

  return (
    <div>
      hello admin
    </div>
  )
}
*/




