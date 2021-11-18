import React from "react";
import { LevelCommon } from "../../AddNewPermissionList/js/AddNewPermissionList";

function AddNewPreferenceList() {
  return (
    <div>
      {[1, 2, 3].map((level, index) => {
        return <LevelCommon level={level} type="Preference" />;
      })}
    </div>
  );
}

export default AddNewPreferenceList;
