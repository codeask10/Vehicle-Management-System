import React,{useState} from 'react'

const QualityCheck = () => {
    const [qualityCheckStatus, setQualityCheckStatus] = useState();
    const handleUpdateStatus = async () => {
        try {
        
        } catch (error) {
          console.error('Error updating quality check status:', error);
        }
      };
  return (
    <div>
      <h3>Quality Check</h3>
      <select value={qualityCheckStatus} onChange={(e) => setQualityCheckStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  )
}

export default QualityCheck