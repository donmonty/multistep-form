import { useField, FieldHookConfig } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { nanoid } from "nanoid";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: "200px",
  maxHeight: "120px",
  // width: 'auto',
  // height: '100%'
};

const buttonStyles = "block w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0 font-semibold bg-violet-50 text-violet-700 hover: bg-violet-100";

export interface UploadableFile {
  id: string;
  file: File;
  errors: FileError[];
  url?: string;
}

type OtherProps = {
  label: string;
  required?: boolean;
  mask?: any;
}

export interface FileWithPreview extends File {
  preview: string;
}

function ImageUploadField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [file, setFile] = useState<UploadableFile | null>(null);
  // const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [field, meta, helpers] = useField(props);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const mappedAcceptedFiles = acceptedFiles.map(file => {
      const fileWrapper: UploadableFile = {
        id: nanoid(),
        file,
        errors: [],
        url: URL.createObjectURL(file)
      };
      return fileWrapper;
    });

    const mappedRejectedFiles = rejectedFiles.map(file => {
      return {
        ...file,
        id: nanoid(),
      };
    });

    if (mappedAcceptedFiles || mappedRejectedFiles) {
      setFiles((curr) => [...curr, ...mappedAcceptedFiles, ...mappedRejectedFiles]);
    }
  }, []);

  const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    maxSize: 3000 * 1024, // 3000KB
    onDrop,
    // onDrop: (acceptedFiles) => {
    //   setFiles(acceptedFiles.map(file => Object.assign(file, {
    //     preview: URL.createObjectURL(file)
    //   })));
    // }

    // onDrop: (acceptedFiles) => {
    //   setFile(acceptedFiles.map(file => Object.assign(file, {
    //     preview: URL.createObjectURL(file)
    //   }))[0]);
    // }
  });

  useEffect(() => {
    if (files && files[0]) {
      if (files[0].url) {
        helpers.setValue(files[0].url);
        console.log("field.value:", field.value);
      } else {
        helpers.setValue(files[0].id);
        console.log("field.value:", field.value);
      }
    }
  }, [files]);

  // useEffect(() => {
  //   if (file) helpers.setValue(file.preview);
  //   console.log("field.value:", field.value);
  // }, [file]);

  // const thumbs = files.map((file: FileWithPreview) => (
  //   <div key={file.name}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         style={img}
  //         // Revoke data uri after image is loaded
  //         onLoad={() => { URL.revokeObjectURL(file.preview) }}
  //       />
  //     </div>
  //   </div>
  // ));

  const imagePreview = (
    <div>
      <img
        src={files[0]?.url ? files[0].url : ""}
        className="block h-32 w-60"
        // Revoke data uri after image is loaded
        onLoad={() => {files[0].url && URL.revokeObjectURL(files[0].url)}}
      />
    </div>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    //return () => files.forEach(file => URL.revokeObjectURL(file.url));
    if (files[0]?.url) {
      return () => URL.revokeObjectURL(files[0].url as string);
    }
  }, []);

  const imagePlaceholder = (
    <div className="w-60 h-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-500 flex-col justify-center items-center">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      <p>Click to add image</p>
    </div>
  );

  return (
    <>
      <div {...getRootProps({ className: "max-w-xs"})}>
        <input {...getInputProps()}/>
        <div className="flex flex-wrap mt-8">
          {files[0] && files[0]?.url ? (
            imagePreview
          ): imagePlaceholder}
        </div>
      </div>
    </>

    // <>
    //   <div {...getRootProps({ className: "max-w-xs"})}>
    //     <input {...getInputProps()}/>
    //     <button className={buttonStyles}>{props.label ? props.label : "Choose image"}</button>
    //   </div>
    //   <div className="flex flex-wrap mt-8">
    //     {files[0] && files[0]?.url ? (
    //       imagePreview
    //     ): null}
    //   </div>
    // </>

  );
}

export default ImageUploadField;