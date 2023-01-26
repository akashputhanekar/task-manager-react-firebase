import './taskManager.css';
import Task from '../list-task/Task';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase/firebase';
import AddTask from '../add-task/AddTask';
import { Link } from 'react-router-dom';

function TaskManager() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    /**
     * Here we get all the tasks from firestore in realtime
     */
    useEffect(() => {
        const taskColRef = query(
            collection(db, 'tasks'),
            orderBy('created', 'desc')
        );
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }, []);

    return (
        <div className='taskManager'>
            <header>
                Task Manager
                <button>
                    <Link to='/logout'>Logout</Link>
                </button>
            </header>
            <div className='taskManager__container'>
                <button onClick={() => setOpenAddModal(true)}>
                    Add task +
                </button>
                <div className='taskManager__tasks'>
                    {tasks.map((task) => (
                        <Task
                            id={task.id}
                            key={task.id}
                            completed={task.data.completed}
                            title={task.data.title}
                            description={task.data.description}
                        />
                    ))}
                </div>
            </div>

            {openAddModal && (
                <AddTask
                    onClose={() => setOpenAddModal(false)}
                    open={openAddModal}
                />
            )}
        </div>
    );
}

export default TaskManager;
