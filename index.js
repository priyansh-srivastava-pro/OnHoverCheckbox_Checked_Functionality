import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { useLanguage } from '../../intl/languages';
import { AiOutlineEye } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { RxDownload } from "react-icons/rx";
import { BsTrash3 } from "react-icons/bs";
import { Button } from '@mui/material';
import { RiDeleteBin5Line } from "react-icons/ri";
import Preview from './myFilesTableList/preview';
import DeletePopup from '../../../reuseable/DeletePopup/deletePopup';

function filesData(id, fname, fsize, uploadDate, type, action) {
    return {
        id,
        fname,
        fsize,
        uploadDate,
        type,
        action
    };
}

const fileRows = [
    filesData(1, 'Invoice.pdf', '4 MB', '22 Oct, 2020', 'pdf'),
    filesData(2, 'New.pdf', '5 MB', '23 Nov, 2021', 'pdf'),
    filesData(3, 'New folder', '3 MB', '24 Dec, 2022', 'folder'),
    filesData(4, 'Boat Invoice.pdf', '2 MB', '25 Apr, 2023', 'pdf'),
    filesData(5, 'InfoCom.pdf', '4 MB', '21 May, 2020', 'pdf'),
    filesData(6, 'Untitled folder', '6 MB', '27 Aug, 2022', 'folder'),
    filesData(7, 'downloadInvoice.pdf', '7 MB', '25 Feb, 2023', 'pdf'),
    filesData(8, 'resume.pdf', '252 KB', '28 Jan, 2021', 'pdf'),
    filesData(9, 'camera invoice.pdf', '2252 KB', '28 Jan, 2021', 'pdf'),
    filesData(10, 'card.pdf', '2152 KB', '28 Jan, 2021', 'pdf'),
    filesData(11, 'birth certificate.pdf', '202 KB', '28 Jan, 2021', 'pdf'),
    filesData(12, 'id.pdf', '6 MB', '28 Jan, 2021', 'pdf'),
    filesData(13, 'documents.pdf', '5 MB', '28 Jan, 2021', 'pdf'),
    filesData(14, 'Confidential Documents.pdf', '150 KB', '28 Jan, 2021', 'pdf'),
    filesData(15, 'InMeet - Client', '100 KB', '28 Jan, 2021', 'folder'),
    filesData(16, 'certificate.pdf', '500 KB', '28 Jan, 2021', 'pdf'),
    filesData(17, 'Inlynk', '300 KB', '28 Jan, 2021', 'folder'),
    filesData(18, 'InMeet', '258 KB', '28 Jan, 2021', 'folder')
];

const headCells = [
    {
        id: 'fname',
        label: 'File Name',
    },
    {
        id: 'fsize',
        label: 'File Size',
    },
    {
        id: 'uploadDate',
        label: 'Upload Date',
    },
    {
        id: 'actions',
        label: 'Action',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow className="tablecolor">
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const { translate } = useLanguage();

    return (
        <>
            {numSelected > 0 && <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} file selected
                </Typography>
                <Button color="error" variant="outlined" className="brdrRadiusSM listDelBtn" startIcon={<RiDeleteBin5Line />}> {translate("instavc_meeting_details_delete")}</Button>
            </Toolbar>}
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [selected, setSelected] = React.useState([]);
    const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);
    const { translate } = useLanguage();    
  const [ preview,setPreview] = React.useState(false)  
  const [del, setDel] = React.useState(false);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = fileRows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else if (selectedIndex === 0) {
            newSelected = selected.slice(1);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = selected.slice(0, -1);
        } else if (selectedIndex > 0) {
            newSelected = [
                ...selected.slice(0, selectedIndex),
                ...selected.slice(selectedIndex + 1),
            ];
        }

        setSelected(newSelected);
    };

    const handleRowHover = (index) => {
        setHoveredRowIndex(index);
    };

    const handleRowLeave = () => {
        setHoveredRowIndex(null);
    };

    const handlePreview = () => {
        setPreview(true);
      };
    
      const handleClosePreview = () => {
        setPreview(false);
      };

      const handleDelete = () => {
        setDel(true);
      };
    
      const handleCloseDelete = () => {
        setDel(false);
      };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)' }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        stickyHeader aria-label="sticky table"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={fileRows.length}
                        />
                        <TableBody>
                            {fileRows.map((data, index) => {
                                const isItemSelected = isSelected(data.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const isHovered = hoveredRowIndex === index;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, data.id)}
                                        onMouseEnter={() => handleRowHover(index)}
                                        onMouseLeave={handleRowLeave}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={data.id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            {(isHovered || isItemSelected) && (
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />)}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="data"
                                        >
                                            <div className="tableTxtColor">
                                                <div className="flexRow aCntr" data-testid="feedback-item">
                                                    {data?.type === 'pdf' ? <div className="flexAutoRow aCntr">
                                                        <img src='/icons/pdf1.svg' alt='pdf' className='IconImage' />
                                                    </div>
                                                        : <div className="flexAutoRow pointer aCntr">
                                                            <img src='/icons/folder.svg' alt='pdf' className='IconImage' />
                                                        </div>}
                                                    <div className="flexMinWidthRow pdngLMD">
                                                        <span className="txtBlSM ellipsisTxt">
                                                            {data.fname}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{data.fsize}</TableCell>
                                        <TableCell>{data.uploadDate}</TableCell>
                                        <TableCell>
                                            <div className='flexInline pointer'>
                                                <Tooltip title={translate("preview")} placement="top">
                                                    <span className='pdngHXS'>
                                                        <AiOutlineEye fontSize={'18px'} color='rgba(4, 48, 64, 1)' onClick={handlePreview}/>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className='flexInline pointer'>
                                                <Tooltip title='Rename' placement="top">
                                                    <span className='pdngHXS'>
                                                        <RiEditLine fontSize={'18px'} color='rgba(4, 48, 64, 1)' />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className='flexInline pointer'>
                                                <Tooltip title={translate("download")} placement="top">
                                                    <span className='pdngHXS'>
                                                        <RxDownload fontSize={'18px'} color='rgba(4, 48, 64, 1)' />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className='flexInline pointer'>
                                                <Tooltip title={translate("instavc_meeting_details_delete")} placement="top">
                                                    <span className='pdngHXS'>
                                                        <BsTrash3 fontSize={'18px'} color='rgba(4, 48, 64, 1)' onClick={handleDelete}/>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
        {preview && 
        <Preview handlePreview={handlePreview} handleClosePreview={handleClosePreview} />}
        {del && <DeletePopup
        title={translate("instavc_meeting_details_delete")}
        label={translate("are_yousurefile")}
        closeCallBack={handleCloseDelete}
        cancel={translate("instavc_schedule_cancel")}
        type={translate("instavc_meeting_details_delete")}
      />}
        </>
    );
}
