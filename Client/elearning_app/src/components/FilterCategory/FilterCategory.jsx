import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice/CategorySlice";
import { setCategoryFilter } from "../../redux/CourseSlice/CourseSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

const FilterCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { categoryFilter } = useSelector((state) => state.course);

  useEffect(() => {
    if (!categories.length && !loading && !error) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, loading, error]);

  const handleChange = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  return (
    <Box sx={{ minWidth: 120, width: { xs: "100%", sm: "auto" } }}>
      <FormControl fullWidth error={!!error} disabled={loading}>
        <InputLabel id="category-filter-label">Danh mục</InputLabel>
        <Select
          labelId="category-filter-label"
          value={categoryFilter || ""}
          label="Danh mục"
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
          <MenuItem value="">Tất cả danh mục</MenuItem>
          {categories.map((cate) => (
            <MenuItem key={cate.id} value={String(cate.id)}>
              {cate.name}
            </MenuItem>
          ))}
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </FormControl>
    </Box>
  );
};

export default FilterCategory;
