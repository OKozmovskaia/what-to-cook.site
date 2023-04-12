import React from "react";

const DataDeletion = () => {
  return (
    <div>
      <h1>Facebook Data Deletion Instructions</h1>
      <p>
        What-To-Cook app uses the Facebook login and we do not save your
        personal data in our server. As per Facebook policy, we have to provide
        User Data Deletion Callback URL or Data Deletion Instructions URL.
      </p>
      <p>
        If you want to delete your activities for What-To-Cook app, you can
        remove your information by following these steps:
      </p>
      <ol>
        <li>
          Go to your Facebook Account's Setting & Privacy. Click Settings.
        </li>
        <li>
          Look for Apps and Websites and you will see all of the apps and
          websites you linked with your Facebook.
        </li>
        <li>Search and click What-To-Cook in the search bar.</li>
        <li>Scroll and click Remove.</li>
        <li>
          Congratulations, you have successfully removed your app activities.
        </li>
      </ol>
    </div>
  );
};

export default DataDeletion;
