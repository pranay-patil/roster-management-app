import { TextField, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
const SearchFieldConstom = styled(TextField)`
	gap: 8px;
	gap: 8px;
	border-radius: 8px;
	border-width: 1px;
`;

const SearchFeildContainer = styled.div`
	width: 312px;
	height: 48px;
	width: 100%;
`;
export const SearchField = () => {
	return (
		<SearchFeildContainer>
			{" "}
			<SearchFieldConstom
				variant="outlined"
				placeholder="Search Provider"
				size="small"
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</SearchFeildContainer>
	);
};
