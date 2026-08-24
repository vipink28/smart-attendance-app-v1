import React, { useState } from "react";
import Button from "../../components/form/Button";
import Modal from "../../components/layout/Modal";
import UserForm from "../../components/form/UserForm";

const TeacherStudent = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="py-5">
      <h2 className="text-2xl mb-8">Manage Users</h2>
      <div className="flex items-center justify-between p-5 bg-emerald-700 rounded-md">
        <div className="flex items-center gap-4">
          <Button>Teachers</Button>
          <Button>Students</Button>
        </div>
        <Button onClick={() => setIsModal(true)}>Add User</Button>
      </div>

      {isModal && (
        <Modal onClose={setIsModal}>
          <UserForm />
        </Modal>
      )}
    </div>
  );
};

export default TeacherStudent;
