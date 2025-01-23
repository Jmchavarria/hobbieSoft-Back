export const logout = async () => {
    try {

        return {
            message: 'Logout succesfull'
        }
    } catch (error) {
        console.error('Error log out in the service', error)
        throw new Error('Failed to log out')
    }
}