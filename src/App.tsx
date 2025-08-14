import { useEffect } from "react";
import {
  Landing,
  StepPage,
  Final,
  SaveProgress,
  SaveSuccess
} from "./pages"
import { useMain } from './Context';

export default function App() {
  const { page, setPrevSteps, updateData } = useMain();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const gfToken = queryParams.get('gf_token');
    if (gfToken) {
      fetch(`http://localhost:5000/get_progress/${gfToken}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setPrevSteps(data.prevSteps || [])
          delete data.prevSteps;
          updateData({ ...data, token: gfToken })
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  }, [])

  return (
    <>
      {page === 1 && <Landing />}
      {page === 2 && <StepPage />}
      {page === 3 && <SaveProgress />}
      {page === 4 && <SaveSuccess />}
      {page === 5 && <Final />}
    </>
  );
}
