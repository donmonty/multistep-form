import React from 'react';

interface Props {
  handleIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  children: React.ReactNode;
}

const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";

export default function Modal({handleIsModalVisible, isModalVisible, children }: Props) {
  if (isModalVisible) {
    return (
      <div className='relative'>
        <div
          className="absolute top-0 inset-0 h-144 bg-black opacity-50 h-screen"
          onClick={() => handleIsModalVisible(false)}
        >
        </div>

        <div className="absolute inset-10 bg-slate-100 z-40 h-96 p-6 rounded-lg drop-shadow-lg">
          <div className="flex flex-col justify-between items-center h-full">
            { children }
            <div className='w-72'>
              <button
                onClick={() => handleIsModalVisible(false)}
                className={buttonStyles}
              >
                Ok
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
  return null;
}
