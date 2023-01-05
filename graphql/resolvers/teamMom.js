import TeamMom from '../../models/teamMom.js';
import User from '../../models/user.js';
import { teamMomObject } from '../../utils/objectHelper.js';

const teamMomResolver = {
	deleteTeamMom: async (args) => {
		const { teamMomId } = args;

		const teamMom = await TeamMom.findByIdAndDelete(teamMomId);

		return teamMomObject(teamMom, 'Deleted');
	},
	updateTeamMom: async (args) => {
		const { teamMomId, teamMomInput } = args;

		const teamMom = await TeamMom.findByIdAndUpdate(
			teamMomId,
			{
				...teamMomInput,
			},
			{ new: true }
		);

		return teamMomObject(teamMom);
	},
	teamMom: async (teamMomId) => {
		const teamMom = await TeamMom.findOne({ teamMomId });

		if (!teamMom) {
			throw new Error(`Player with id ${teamMomId} not found`);
		}

		return teamMomObject(teamMom);
	},
	teamMoms: async () => {
		const teamMoms = await TeamMom.find();

		if (!teamMoms) {
			throw new Error('No teamMoms exist');
		}

		return teamMoms.map((teamMom) => {
			return teamMomObject(teamMom);
		});
	},
	createTeamMom: async (args) => {
		const { name, lastName, picture, phone, cleanBGC, user, group } =
			args.teamMomInput;

		if (!name || !lastName || !picture || !phone || !user || !group) {
			throw new Error('Please provide credential');
		}

		try {
			const teamMomAlreadyExist = await TeamMom.findOne({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
			});

			if (teamMomAlreadyExist) {
				throw new Error(`${name} ${lastName} exist already`);
			}

			const teamMom = new TeamMom({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
				picture,
				phone,
				group,
				cleanBGC,
				user,
			});

			const result = await teamMom.save();

			await User.findByIdAndUpdate(user, {
				role: result._id,
			});

			return teamMomObject(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default teamMomResolver;
