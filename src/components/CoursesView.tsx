import React from "react";

interface Props {
  name: string;
}

const CourseView: React.FC<Props> = (props) => {
  return (
    <>{props.name}</>
  );
};

export default CourseView;
