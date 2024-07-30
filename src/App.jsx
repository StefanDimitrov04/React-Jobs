import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleJobPage , {jobLoader} from "./pages/SingleJobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";



const App = () => {

  const addJob = async  (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json', 
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "DELETE",
        });
        return;
  }

  const editJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        'Contenty-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });

    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}> 
    <Route index element={<HomePage/>}/>
    <Route path="/jobs" element= {<JobsPage/>} />
    <Route path="/add-job" element = {<AddJobPage addJobSubmit={addJob}/>} />
    <Route path="/jobs/edit/:id" element={<EditJobPage editJobSubmit={editJob} />} loader={jobLoader} />
    <Route path ="jobs/:id" element={<SingleJobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
    <Route path="*" element={<NotFoundPage/>} />
      </Route>
  )
  );

  return <RouterProvider router={router} />
}

export default App;