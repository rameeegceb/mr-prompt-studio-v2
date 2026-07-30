import { useEffect, useState } from "react";
import CourseRepository from "../repository/CourseRepository";

export default function useCourse() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    CourseRepository.load()
      .then(data => {
        if (!mounted) return;

        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) return;

        setError(err.message);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    course,
    loading,
    error,
  };
}