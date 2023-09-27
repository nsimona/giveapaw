import { useEffect, useState } from "react";
import StickyHeadTable from "../sticky-head-table";
import { getUserApplications } from "../../services/api";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/app/appSlice";
import StatusTag from "../sticky-head-table/status-tag";
import { Dialog, Link } from "@mui/material";
import ExisitingApplicationWrapper from "../../pages/application/existing-application-wrapper";

const columns = [
  { id: "date", label: "Дата", minWidth: 80 },
  { id: "pet", label: "Домашен любмиец", minWidth: 80 },
  {
    id: "status",
    label: "Статус",
    minWidth: 80,
    align: "right",
  },
];

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [rows, setRows] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplicationId, setSelecetedApplicationId] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const applications = await getUserApplications();
        setApplications(applications);
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `Грешка при зареждане на кандидатури, ${error}`,
          })
        );
      }
    };
    fetchUserApplications();
  }, [dispatch]);

  const onApplicationClick = (applicationId) => {
    setIsDialogOpen(true);
    setSelecetedApplicationId(applicationId);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const rowsData = applications.map((application) => {
      return {
        date: "nz",
        pet: (
          <Link href={`/pet/${application.pet.id}`}>
            {application.pet.name}
          </Link>
        ),
        status: <StatusTag status={application.status} />,
        applicationId: application.id,
      };
    });
    setRows(rowsData);
  }, [applications]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isDialogOpen}
        onClose={onDialogClose}
      >
        <ExisitingApplicationWrapper applictionId={selectedApplicationId} />
      </Dialog>
      <StickyHeadTable
        columns={columns}
        rows={rows}
        onRowClick={onApplicationClick}
      />
    </>
  );
};
export default UserApplications;
