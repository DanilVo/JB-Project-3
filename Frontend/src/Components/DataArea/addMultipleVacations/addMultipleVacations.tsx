import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ExcelJs, { Image } from "exceljs";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleVacationsModel from "../../../Models/MultipleVacationsModel";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import DragDropFileUpload from "../DragDropFileUpload/DragDropFileUpload";
import "./addMultipleVacations.css";

interface ExtendedImage extends Image {
  name?: string;
}

function AddMultipleVacations(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [vacationsCount, setVacationsCount] = useState<number>(0);
  const [vacationsToUpload, setVacationsToUpload] = useState<
    MultipleVacationsModel[]
  >([]);

  const uploadVacations = async () => {
    try {
      setLoading(true);
      await vacationService.addMultipleVacations(vacationsToUpload);
      navigate("/home");
    } catch (err: any) {
      console.log(err);

      notificationService.error("Error uploading vacations");
      setVacationsCount(0);
      setVacationsToUpload([]);
    } finally {
      setLoading(false);
    }
  };

  const excelFileImport = async (csv: any) => {
    try {
      if (!csv.name.includes(".xlsx"))
        return notificationService.error("File format is not valid");
      setLoading(true);
      const workbook = await loadWorkbook(csv);
      const data: MultipleVacationsModel[] = parseWorkbook(workbook);
      setVacationsToUpload(data);
      setVacationsCount(data.length);
      return data;
    } catch (err: any) {
      notificationService.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkbook = async (csv: any) => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.load(csv);
    return workbook;
  };

  const parseWorkbook = (workbook: ExcelJs.Workbook) => {
    const data: MultipleVacationsModel[] = [];

    workbook.eachSheet((sheet) => {
      if (sheet.columnCount !== 6) {
        notificationService.error("Error loading workbook, stick to template");
        return;
      }
      // Indexation of rows starts with 1, first row are the keys,
      // row 2 and further are actual data,
      // image indexation starts with 0

      const keys = sheet.getRow(1).values as string[];

      for (let rowIndex = 2; rowIndex <= sheet.rowCount; rowIndex++) {
        if (!sheet.getRow(rowIndex).values.length) return data;

        const values = sheet.getRow(rowIndex).values as any[];
        const image = createImageFile(workbook, rowIndex - 2);
        values.push(image);

        const rowObject: MultipleVacationsModel = {
          destination: "",
          description: "",
          price: 0,
          vacationStartDate: undefined,
          vacationEndDate: undefined,
          image: undefined,
        };

        keys.forEach((el, index) => {
          if (!values[index]) {
            throw new Error("Missing fields");
          } else if (values[index]?.result) {
            (rowObject as any)[el] = moment(
              new Date(values[index].result)
            ).format("YYYY-MM-DD");
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
    const image: ExtendedImage = workbook.getImage(index);
    const blob = new Blob([image.buffer], { type: image.extension });
    return new File([blob], `${image.name}.${image.extension}`, {
      type: image.extension,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        color="Highlight"
        align="left"
        sx={{ mb: 3, ml: 1 }}
      >
        Add multiple vacations at once:
      </Typography>

      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: "#f5f5f5",
              width: "80%",
              p: 3,
              m: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography color="text.secondary" variant="body2">
              Download template or insert existing excel file.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Fill rows according to columns names.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              To upload image:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <Typography color="text.secondary" variant="body2">
                I. Press "Insert"
              </Typography>
              <Typography color="text.secondary" variant="body2">
                II. "Image"
              </Typography>
              <Typography color="text.secondary" variant="body2">
                III. "Insert into cell"
              </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2">
              Upload file with extension ".xlsx".
            </Typography>
          </Paper>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid item xs={12} sm={5} sx={{ m: "auto", ml: 2 }}>
          {vacationsCount > 0 ? (
            <>
              {loading && <CircularProgress />}
              <Typography>Uploaded {vacationsCount} new vacations.</Typography>
              <ButtonGroup variant="contained" color="error">
                <Button color="success" onClick={uploadVacations}>
                  Upload
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setVacationsCount(0);
                    setVacationsToUpload([]);
                  }}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              {loading && <CircularProgress />}
              <DragDropFileUpload
                onFileUpload={excelFileImport}
                fileType="*.xlsx"
              />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddMultipleVacations;
