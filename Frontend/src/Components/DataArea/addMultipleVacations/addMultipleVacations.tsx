import notificationService from '../../../Services/NotificationService';
import DragDropFileUpload from '../DragDropFileUpload/DragDropFileUpload';
import './addMultipleVacations.css';
import ExcelJs from 'exceljs';

export type Vacation = {
  destination: string;
  description: string;
  price: number;
  vacationStartDate: VacationDate;
  vacationEndDate: VacationDate;
  image: File;
};

export type VacationDate = {
  formula: string;
  result: string;
};

function AddMultipleVacations(): JSX.Element {
  const excelFileImport = async (csv: any) => {
    try {
      const workbook = await loadWorkbook(csv);
      const data: Vacation[] = parseWorkbook(workbook);
      console.log(data);
    } catch (err: any) {
      notificationService.error('Error loading workbook');
    }
  };

  const loadWorkbook = async (csv: any) => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.load(csv);
    return workbook;
  };

  const parseWorkbook = (workbook: ExcelJs.Workbook) => {
    const data: Vacation[] = [];

    workbook.eachSheet((sheet) => {
      if (sheet.columnCount !== 6) {
        notificationService.error('Error loading workbook, stick to template');
        return;
      }
      // Indexation of rows starts with 1, first row are the keys,
      // row 2 and further are actual data,
      // image indexation starts with 0
      const keys = sheet.getRow(1).values as string[];

      for (let rowIndex = 2; rowIndex <= sheet.rowCount; rowIndex++) {
        const values = sheet.getRow(rowIndex).values as any[];
        const image = createImageFile(workbook, rowIndex - 2);
        values.push(image);

        const rowObject: Vacation = {
          destination: '',
          description: '',
          price: 0,
          vacationStartDate: undefined,
          vacationEndDate: undefined,
          image: undefined,
        };

        keys.forEach((el, index) => {
          if (values[index]?.result) {
            (rowObject as any)[el] = new Date(values[index].result);
          } else {
            (rowObject as any)[el] = values[index];
          }
        });

        data.push(rowObject);
      }
    });

    return data;
  };

  const createImageFile = (workbook: ExcelJs.Workbook, index: number) => {
    const image = workbook.getImage(index);
    const blob = new Blob([image.buffer], { type: 'image/*' });
    return new File([blob], 'test.png', { type: 'image/*' });
  };

  return (
    <>
      <DragDropFileUpload onFileUpload={excelFileImport} fileType="*.xlsx" />
    </>
  );
}

export default AddMultipleVacations;
