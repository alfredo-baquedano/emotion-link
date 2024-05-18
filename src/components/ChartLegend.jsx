const ChartLegend = ({emotions}) => {
  const emotionValues = Object.values(emotions)
  return (
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      {emotionValues.map(emotion => 
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '25px'}}>
          <div style={{ backgroundColor: emotion.color, height: '16px', width: '16px' }}></div>
          <span style={{ marginLeft: '8px' }}>{emotion.display_name}</span>
        </div>
      )}
    </div> 
  )
}

export default ChartLegend;