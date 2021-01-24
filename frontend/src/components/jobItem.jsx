import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import { Link } from 'react-router-dom';

import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
// English.

function JobItem({ job, location, position }) {
  if (job.location.includes(location) || location === 'All') {
    if (job.category.includes(position) || position === 'All-Pos') {
      return (
        <Link to={{ pathname: '/newApplication', data: job }}>
          <div className="job-item">
            <span className="job-company">{job.company}</span>
            <div
              className="img"
              style={{
                backgroundColor: 'white',
                backgroundImage: `url(${job.companyLogo})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 100,
                height: 100,
                borderRadius: 999,
                boxShadow: '0 1px 1px 0 rgba(100,100,100,0.1)',
              }}
            ></div>
            {/* <img src={job.companyLogo} /> */}
            <span className="job-position">{job.position}</span>
            <span className="job-location">
              {job.location.length > 10
                ? job.location.slice(0, 10) + '...'
                : job.location}
            </span>
            <span className="job-time">
              <ReactTimeAgo date={job.time} locale="en-US" />
            </span>
          </div>
        </Link>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
}

export default JobItem;
