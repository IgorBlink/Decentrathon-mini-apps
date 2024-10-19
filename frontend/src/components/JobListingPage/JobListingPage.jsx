import React, { useState, useEffect } from 'react';
import './JobListingPage.css'; // Не забудьте создать этот файл для стилей
import Footer from '../Footer/Footer';

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]); // Состояние для хранения вакансий
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Функция для получения списка вакансий
  const fetchJobs = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`);
    const data = await response.json();
    setJobs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs(); // Получаем вакансии при загрузке страницы
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (jobTitle && jobDescription) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: jobTitle, description: jobDescription }),
      });

      if (response.ok) {
        setJobTitle('');
        setJobDescription('');
        fetchJobs(); // Обновляем список вакансий после добавления новой
      } else {
        console.error('Ошибка при добавлении вакансии');
      }
    }
  };

  return (
    <div className="job-listing-page">
      <h1>Создание вакансии</h1>
      <form className="job-form" onSubmit={handleAddJob}>
        <input
          type="text"
          placeholder="Название вакансии"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание вакансии"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <button type="submit">Добавить вакансию</button>
      </form>

      <h2>Список вакансий</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ul className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
              </li>
            ))
          ) : (
            <p>Нет созданных вакансий.</p>
          )}
        </ul>
      )}

      <Footer />
    </div>
  );
};

export default JobListingPage;
