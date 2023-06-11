import db from '../db/db.js';
import Group from "../models/Group.js";
import { InvalidGroupRequestError } from "../errors/index.js";

class GroupService {
    async createGroup(groupData) {
        try {
            return await db.transaction(async () => {
                return await Group.create(groupData);
            })
        }
        catch (err) {
            throw new Error(err)
        }

    }

    async getGroups(offset, limit) {
        try {
            const { count, rows } = await Group.findAndCountAll({
                attributes: ['id', 'name', 'permission'],
                offset,
                limit
            });
            return  { count, rows };
        } catch (err) {
            throw new InvalidGroupRequestError('Groups fetching error.');
        }
    }

    async getGroup(id) {
        try {
            const group = await Group.findByPk(id);
            if (!group) {
                throw new Error();
            }
            return group;
        } catch (err) {
            throw new InvalidGroupRequestError('Group fetching error.');
        }
    }

    async updateGroup(group) {
        const { id, ...groupFields} = group;
        try {
            return await db.transaction(async () => {
                const isGroupExist = await this.getGroup(id);

                if (!isGroupExist) {
                    throw new Error();
                }

                await Group.update({...groupFields}, {
                    where: { id }
                });
                return `Group with ID ${id} is updated.`;
            })
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to update group.');
        }
    }

    async deleteGroup(id) {
        try {
            return await db.transaction(async () => {
                const isGroupExist = await this.getGroup(id);

                if (!isGroupExist) {
                    throw new Error();
                }

                await Group.destroy( {
                    where: { id }
                });
                return `Group with ID ${id} is deleted.`;
            })
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to delete group.');
        }
    }
}

export default new GroupService();
