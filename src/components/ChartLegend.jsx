const ChartLegend = ({emotionList}) => 
  <div style={{ display: 'flex', flexDirection: 'row'}}>
    {emotionList.map(emotion => 
      <div
        key={emotion.name}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '25px'}}>
        <div style={{ backgroundColor: emotion.color, height: '16px', width: '16px' }}></div>
        <span style={{ marginLeft: '8px' }}>{emotion.display_name}</span>
      </div>
    )}
  </div>

export default ChartLegend;