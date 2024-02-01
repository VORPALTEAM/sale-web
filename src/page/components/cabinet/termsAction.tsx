import React from "react";

const TermsAgreeAction = () => {
  return (
    <div className="TermsRow">
      <label htmlFor="trcheck">
        <div className="confirmField">
          <input name="trcheck" type="checkbox" className="_hidden" />
        </div>
      </label>
      <div className="confirmText">
        I accept all <a>terms</a> and <a>conditions</a>
      </div>
    </div>
  );
};

export default TermsAgreeAction;
