import { useRef, useEffect, useState, forwardRef } from 'react';
import emotions from './../contants/emotions.json';
import * as d3 from 'd3';
import {
  Autocomplete,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Tooltip,
} from '@mui/material';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import CloseIcon from '@mui/icons-material/Close';
import useUser from '../contexts/UserContext';

const EmotionSelect = ({ name, onChange, value = [], options }) => {
  const { getLevel } = useUser();
  const [openEmotionWheel, setOpenEmotionWheel] = useState(false);
  const handleOpenEmotionWheel = () => setOpenEmotionWheel(true);
  const handleCloseEmotionWheel = () => setOpenEmotionWheel(false);
  const userLevel = getLevel();

  const handleClearEmotions = () =>
    onChange({
      target: {
        name,
        value: [],
      },
    });

  const getTooltipText = (emotion) =>
    emotion.level > userLevel
      ? `You need level ${emotion.level} to unlock this emotion`
      : '';

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

  const emotionList = getEmotionArray(emotions);
  const getCurrentEmotions = (emotions, value) =>
    getEmotionArray(emotions).filter((emotion) => {
      return value.find((v) => v === emotion.name);
    });

  const width = 800;
  const radius = width / 6;

  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      const svgElement = d3.select(ref.current);
      loadChart(svgElement);
    }, 50);
    return () => d3.select(ref.current).selectAll('*').remove();
  }, [value, options, openEmotionWheel]);

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
    const currentEmotions = getCurrentEmotions(emotions, value);

    svg.attr('viewBox', autoBox).node();
    svg
      .attr('style', 'font: 8px sans-serif;')
      .append('g')
      .selectAll('path')
      .data(root.descendants().filter((d) => d.depth))
      .join('path')
      .attr('fill-opacity', (d) =>
        currentEmotions.find((e) => e.name === d.data.name) ? 1 : 0.6,
      )
      .attr('fill', (d) => (d.data.level > userLevel ? 'gray' : d.data.color))
      .attr('id', (d) => d.data.name)
      .on('click', function () {
        const emotionData =
          d3.select(this)._groups?.[0]?.[0]?.__data__?.data ?? '';
        if (emotionData.level > userLevel) return;
        const index = currentEmotions.findIndex(
          (emotion) => emotion.name === emotionData.name,
        );
        let value = [];
        if (index === -1) {
          value = [
            ...currentEmotions.map((emotions) => emotions.name),
            emotionData.name,
          ];
        } else {
          value = currentEmotions
            .filter((_, i) => i !== index)
            .map((emotions) => emotions.name);
        }
        onChange({
          target: {
            name,
            value,
          },
        });
      })
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.description}\nNote: ${getTooltipText(d.data)}`);

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

  return (
    <>
      <Autocomplete
        sx={{ mt: 2 }}
        multiple
        fullWidth
        value={getCurrentEmotions(emotions, value)}
        options={(options ?? emotionList).sort(
          (a, b) => Number(a.level > userLevel) - Number(b.level > userLevel),
        )}
        popupIcon={false}
        onChange={(event, newValue) => {
          onChange({
            target: {
              name,
              value: newValue.map((emotion) => emotion.name),
            },
          });
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
          <Tooltip title={getTooltipText(option)} placement='top' arrow>
            <div style={{ display: 'inline-block' }}>
              <Chip
                {...props}
                key={option.name}
                label={option.displayName}
                disabled={option.level > userLevel}
                style={{
                  margin: '3px',
                  borderWidth: 1,
                  display: 'inline-block',
                  backgroundColor: option.color,
                  color: '#000',
                }}
              />
            </div>
          </Tooltip>
        )}
        renderInput={(params) => (
          <Box sx={{ position: 'relative' }}>
            <TextField
              {...params}
              label='Emotions'
              name={name}
              inputProps={{
                ...params.inputProps,
              }}
            ></TextField>
            <IconButton
              sx={{ position: 'absolute', right: 4, top: 8 }}
              onClick={handleOpenEmotionWheel}
            >
              <DonutSmallIcon />
            </IconButton>
          </Box>
        )}
      />
      <Dialog
        fullScreen
        open={openEmotionWheel}
        onClose={handleCloseEmotionWheel}
        // TransitionComponent={forwardRef((props2, transitionFef) => (
        //   <Slide
        //     {...props2}
        //     direction='up'
        //     ref={transitionFef}
        //     mountOnEnter
        //     unmountOnExit
        //   />
        // ))}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleCloseEmotionWheel}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Select Emotions
            </Typography>
            <Button onClick={handleClearEmotions}>Clear</Button>
            <Button onClick={handleCloseEmotionWheel}>Save</Button>
          </Toolbar>
        </AppBar>
        {openEmotionWheel && (
          <DialogContent
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <svg width='600' height='600' ref={ref}></svg>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default EmotionSelect;
