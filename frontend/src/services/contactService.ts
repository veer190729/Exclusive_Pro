import { adminService, type ContactMessageInput } from '@/services/adminService'

export const contactService = {
  sendMessage(payload: ContactMessageInput) {
    return adminService.sendContactMessage(payload)
  },
}