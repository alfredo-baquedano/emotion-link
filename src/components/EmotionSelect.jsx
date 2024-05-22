import { useRef, useEffect, useState, useId } from 'react';
import emotions from './../contants/emotions.json';
import * as d3 from 'd3';
import {
  Autocomplete,
  Chip,
  IconButton,
  Popper,
  Paper,
  Fade,
  Typography,
  TextField,
} from '@mui/material';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const EmotionSelect = ({ name, onChange, value }) => {
  const popperId = useId();
  const [popperAnchorEl, setPopperAnchorEl] = useState(false);
  const openEmotionWheel = Boolean(popperAnchorEl);

  const handleOpenEmotionWheel = () =>
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);

  const handleCloseEmotionWheel = () => setPopperAnchorEl(null);

  const getEmotionArray = (obj) => {
    const result = [];
    const recurse = (currentObj) => {
      if (currentObj.name !== 'none') result.push(currentObj);
      if (currentObj.children && Array.isArray(currentObj.children)) {
        currentObj.children.forEach((child) => recurse(child));
      }
    };
    recurse(obj);
    return result;
  };

  const width = 800;
  const radius = width / 6;

  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    loadChart(svgElement);
    return () => d3.select(ref.current).selectAll('*').remove();
  }, []);

  const partition = (data) =>
    d3.partition().size([2 * Math.PI, radius])(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value),
    );

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const autoBox = () => {
    const { x, y, width, height } = ref.current.getBBox();
    return [x, y, width, height];
  };

  const loadChart = (svg) => {
    const root = partition(emotions);
    const format = d3.format(',d');

    svg
      .attr('style', 'max-width: 100%; height: auto; font: 8px sans-serif;')
      .append('g')
      .attr('fill-opacity', 0.6)
      .selectAll('path')
      .data(root.descendants().filter((d) => d.depth))
      .join('path')
      .attr('fill', (d) => {
        while (d.depth > 1) d = d.parent;
        return d.data.color;
      })
      .attr('d', arc)
      .append('title')
      .text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => d.data.displayName)
            .reverse()
            .join('/')}\n${format(d.value)}`,
      );

    svg
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('font-size', 5)
      .attr('font-family', 'sans-serif')
      .selectAll('text')
      .data(
        root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10),
      )
      .join('text')
      .attr('transform', function (d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr('dy', '0.35em')
      .text((d) => d.data.displayName);

    svg.attr('viewBox', autoBox).node();
  };

  const emotionList = getEmotionArray(emotions);

  return (
    <>
      <Autocomplete
        sx={{ mt: 2 }}
        multiple
        fullWidth
        value={value}
        options={emotionList}
        popupIcon={false}
        onChange={(event, newValue) => {
          event.target.name = name;
          event.target.value = newValue;
          onChange(event);
        }}
        getOptionLabel={(option) => option.displayName}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={option.name}
              label={option.displayName}
              style={{
                backgroundColor: option.color,
                color: '#000',
              }}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={(props, option) => (
          <Chip
            {...props}
            key={option.name}
            label={option.displayName}
            style={{
              margin: '3px',
              borderWidth: 1,
              display: 'inline-block',
              backgroundColor: option.color,
              color: '#000',
            }}
          />
        )}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label='Emotions'
              name={name}
              inputProps={{
                ...params.inputProps,
                endadornment: (
                  <IconButton onClick={handleOpenEmotionWheel}>
                    <DonutSmallIcon />
                  </IconButton>
                ),
              }}
            ></TextField>
            <IconButton
              aria-describedby={popperId}
              onClick={handleOpenEmotionWheel}
            >
              <DonutSmallIcon />
            </IconButton>
          </>
        )}
      />
      <Popper
        id={popperId}
        anchorEl={popperAnchorEl}
        open={openEmotionWheel}
        placement='top'
        transition
        style={{ zIndex: 10000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>Select your emotion</Typography>
              <svg width='400' height='400' ref={ref} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default EmotionSelect;
