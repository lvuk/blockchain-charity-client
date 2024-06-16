import { Link } from 'react-router-dom';

const ExternalLink = ({ to, children, ...props }) => {
  return (
    <Link to={to} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </Link>
  );
};

export default ExternalLink;
