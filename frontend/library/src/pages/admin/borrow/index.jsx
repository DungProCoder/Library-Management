import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { CheckCircle, AssignmentReturn } from "@mui/icons-material";

const BorrowRecordList = () => {
    const rows = [
        {
            id: 1,
            user: "Nguyễn Văn A",
            book: "Lập trình Python cơ bản",
            borrow_date: "2025-08-01",
            return_date: "2025-08-10",
            is_returned: false,
        },
        {
            id: 2,
            user: "Trần Thị B",
            book: "Học React từ zero",
            borrow_date: "2025-07-20",
            return_date: "2025-07-30",
            is_returned: true,
        },
    ];

    const columns = [
        { field: "id", headerName: "ID", width: 70, align: "center", headerAlign: "center" },
        { field: "user", headerName: "Người mượn", width: 200 },
        { field: "book", headerName: "Tên sách", flex: 1 },
        {
            field: "borrow_date",
            headerName: "Ngày mượn",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "return_date",
            headerName: "Hạn trả",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "is_returned",
            headerName: "Trạng thái",
            width: 160,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <span style={{ color: params.value ? "green" : "red", fontWeight: "bold" }}>
                    {params.value ? "Đã trả" : "Chưa trả"}
                </span>
            ),
        },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            align: "center",
            headerAlign: "center",
            sortable: false,
            renderCell: (params) => (
                <>
                    {params.row.is_returned ? (
                        <IconButton color="success" size="small" disabled>
                            <CheckCircle />
                        </IconButton>
                    ) : (
                        <IconButton color="primary" size="small">
                            <AssignmentReturn /> {/* Trả sách */}
                        </IconButton>
                    )}
                </>
            ),
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h5" fontWeight="bold">
                    📖 Quản lý mượn / trả sách
                </Typography>
            </Box>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default BorrowRecordList;
