import Button from "./Button";
import { useState } from "react";

const AddComment = () => {
  const [formDisplay, setFormDisplay] = useState(false);

  const handleButtonClick = () => {
    setFormDisplay(true);
  };

  if (!formDisplay)
    return <Button onClick={handleButtonClick}>Add Comment</Button>;

  return <p>form here</p>;
};

export default AddComment;
