import React from "react";
import PropTypes from "prop-types";
import PublicProfilePopup from "../PublicProfilePopup";

const ProfilePopupOverlay = ({
	show,
	avatarNumber,
	name,
	biography,
	transaction,
	volume,
	rank,
	medals,
	onClose,
}) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-gray-600 opacity-35" />
			<div className="relative z-10">
				<PublicProfilePopup
					avatarNumber={avatarNumber}
					name={name}
					biography={biography}
					transaction={transaction}
					volume={volume}
					rank={rank}
					medals={medals}
					onClick={onClose}
				/>
			</div>
		</div>
	);
};

ProfilePopupOverlay.propTypes = {
	show: PropTypes.bool.isRequired,
	avatarNumber: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	biography: PropTypes.string,
	transaction: PropTypes.number,
	volume: PropTypes.number,
	rank: PropTypes.number,
	medals: PropTypes.arrayOf(PropTypes.number),
	onClose: PropTypes.func.isRequired,
};

ProfilePopupOverlay.defaultProps = {
	biography: "",
	transaction: 0,
	volume: 0,
	rank: 0,
	medals: [],
};

export default ProfilePopupOverlay;
