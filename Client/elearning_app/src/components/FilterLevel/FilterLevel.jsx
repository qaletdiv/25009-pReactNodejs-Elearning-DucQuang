import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLevels,
} from "../../redux/LevelSlice/LevelSlice";
import { setLevelFilter } from "../../redux/CourseSlice/CourseSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

const FilterLevel = () => {
  const dispatch = useDispatch();
  const { levels, loading, error } = useSelector((state) => state.level);
  const { levelFilter } = useSelector((state) => state.course);

  useEffect(() => {
    if (!levels.length && !loading && !error) {
      dispatch(fetchLevels());
    }
  }, [dispatch, levels.length, loading, error]);

  const handleChange = (e) => {
    dispatch(setLevelFilter(e.target.value));
  };

  return (
    <Box sx={{ minWidth: 120, width: { xs: "100%", sm: "auto" } }}>
      <FormControl fullWidth error={!!error} disabled={loading}>
        <InputLabel id="level-filter-label">Cấp độ</InputLabel>
        <Select
          labelId="level-filter-label"
          value={levelFilter || ""}
          label="Cấp độ"
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              padding: "8px",
              height: "40px",
            },
            borderRadius: "9999px",
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                "& .MuiMenuItem-root": {
                  padding: "4px 8px",
                  fontSize: "14px",
                },
              },
            },
          }}
        >
          <MenuItem value="">Tất cả cấp độ</MenuItem>
          {levels.map((level) => (
            <MenuItem key={level.id} value={String(level.id)}>
              {level.level}
            </MenuItem>
          ))}
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </FormControl>
    </Box>
  );
};

export default FilterLevel;
