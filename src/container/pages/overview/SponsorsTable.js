import React, { useEffect, useState } from 'react';
import { Table, message, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import UilEye from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import moment from 'moment';

function LoansListTable() {
  const [loansTableData, setLoansTableData] = useState([]);
  const navigate = useNavigate();

  const handleClickEdit = (loan) => {
    navigate(`/admin/ecommerce/edit-sponsor`, { state: { loan } });
  };


  const handlePayInterest = (loan) => {
    navigate(`/admin/ecommerce/edit-product`, { state: { loan } });
  };

  const handleRefresh = () => {
    fetch(`${adminUrl}/loans/all_loans`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setLoansTableData(data.data);
        } else {
          message.error('Failed to fetch loans data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching loans data');
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleClickDelete = (loan_id) => {
    // Implement loan deletion logic
    console.log('Clicked Delete Loan ID:', loan_id);
    // You may want to show a confirmation dialog before deletion
    // Then delete the loan and refresh the list
  };

  const loansTableColumns = [
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      key: 'date_time',
      render: date_time => moment(date_time).format('MMMM Do YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Borrower',
      key: 'borrower',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Guarantor',
      key: 'guarantor',
      render: (_, record) => record.guarrantor_id ? `${record.guarrantor_first_name} ${record.guarrantor_last_name}` : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
    },
    {
      title: 'Loan Balance',
      dataIndex: 'LoanBalance',
      key: 'LoanBalance',
    },
    {
      title: 'Transfer Fees',
      dataIndex: 'TransferFees',
      key: 'TransferFees',
    },
    {
      title: 'Interest Amount',
      dataIndex: 'InterestAmount',
      key: 'InterestAmount',
    },
    {
      title: 'Interest Paid',
      dataIndex: 'InterestPaid',
      key: 'InterestPaid',
    },
    {
      title: 'Interest Balance',
      dataIndex: 'InterestBalance',
      key: 'InterestBalance',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Loan ID',
      dataIndex: 'loan_id',
      key: 'loan_id',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="table-actions">
          <Tooltip title="Pay Loan">
            <Button className="btn-icon" type="info" onClick={() => handleClickEdit(record)} shape="circle">
              <UilEye />
            </Button>
          </Tooltip>
          <Tooltip title="Pay Interest">
            <Button className="btn-icon" type="info" onClick={() => handlePayInterest(record)} shape="circle">
              <UilEye />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={loansTableData}
            columns={loansTableColumns}
            rowKey="loan_id"
            pagination={{
              defaultPageSize: 10,
              total: loansTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default LoansListTable;
