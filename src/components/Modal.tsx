import React from 'react';

interface Props {
  handleIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  children: React.ReactNode;
}

const primaryBtnStyles = "flex mt-2 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-72 disabled:bg-gray-300 self-center lg:w-36";

const buttonStyles = "flex mr-3 justify-center py-4 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";

export default function Modal({handleIsModalVisible, isModalVisible, children }: Props) {
  if (isModalVisible) {
    return (
      <div className='relative'>
        <div
          className="absolute top-0 inset-0 h-144 bg-black opacity-50 h-screen"
          onClick={() => handleIsModalVisible(false)}
        >
        </div>

        <div className="absolute inset-6 bg-white z-40 h-fit pt-10 px-9 border-4 border-figOrange-700 drop-shadow-lg">
          <div className="flex flex-col justify-between items-center h-full">
            { children }
            <div className='w-72 mt-5 mb-5'>
              <button
                onClick={() => handleIsModalVisible(false)}
                className={primaryBtnStyles}
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
