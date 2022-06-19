import Button from "react-bootstrap/Button";
import { useState } from 'react';
import './common-styles/common.css'

const Description = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(!props.collapsed);

  return (
    <>
      <Button variant="secondary"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show' : 'Hide'} description
      </Button>
      <div
        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {props.children}
      </div>
    </>
  );
};

export default Description;
