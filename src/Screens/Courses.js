import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import Wrapper from "../components/Wrapper";
import { getAllCourses } from "../services/courses";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(courses.length <= 0);
  }, [courses]);

  useEffect(() => {
    (async () => {
      const { courses } = await getAllCourses();

      setCourses(courses);
    })();
  }, []);

  const Course = ({ course }) => {
    const { _id, courseName, shortName, affiliatedTo, duration } = course;
    const [durationTime, durationType] = duration.split(" ");
    const durationTimeInNumber = durationTime === "Eight" ? 8 : 4;

    return (
      <Card
        className="course"
        loading={loading}
        title={shortName}
        extra={<a href="#">Details</a>} // TODO: use <Link> to navigate
      >
        <div>
          <em>{courseName}</em>
          <p className="font-light">
            {affiliatedTo} - {duration}
          </p>
        </div>

        {/* <div className="attendance">
          <small>Attendance:</small> <br />
          <p>
            <span>23</span>/<span>27</span>
          </p>
          <small>As of: {new Date().toLocaleDateString()}</small>
        </div> */}
        <Semesters duration={durationTimeInNumber} course={_id} />
      </Card>
    );
  };

  const Semesters = ({ duration, course }) => {
    let semesters = [];

    for (let i = 1; i <= duration; i++) {
      semesters.push(
        <Link
          key={i}
          to={`/subjects?course=${course}&semester=${i}`}
          className="semester"
        >
          {i}
        </Link>
      );
    }

    return (
      <div>
        <small className="mb-2">Choose a semester:</small>
        <div className="semesters w-100 flex">{semesters}</div>
      </div>
    );
  };

  return (
    <Wrapper className="flex dashboard">
      <DashboardNav />

      <div className="courses flex wrap gap-8 items-center justify-center">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </Wrapper>
  );
}
