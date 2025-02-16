import { mount } from "@vue/test-utils";
import AdminView from "../views/AdminView.vue";
import TicketCard from "@/components/TicketCard.vue";
import TicketDialog from "@/components/dialogs/TicketDialog.vue";
import { createPinia, setActivePinia } from "pinia";
import { useTicketStore } from "@/stores/ticketStore";
import { createVuetify } from "vuetify";
import "vuetify/styles";

describe("AdminView.vue", () => {
  let ticketStore: ReturnType<typeof useTicketStore>;
  let vuetify: ReturnType<typeof createVuetify>;

  beforeEach(() => {
    // Set up Pinia store
    setActivePinia(createPinia());
    ticketStore = useTicketStore();

    // Create Vuetify instance
    vuetify = createVuetify();
  });

  it("renders properly with no tickets", () => {
    ticketStore.tickets = [];

    const wrapper = mount(AdminView, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    });

    expect(wrapper.text()).toContain("Existing Tickets");
    expect(wrapper.text()).toContain("No tickets available.");
  });

  it("renders tickets when available", () => {
    ticketStore.tickets = [
      { "id": 1, "name": "Concert A", "description": "Live concert event", "isVIP": false, "count": 50, "price": 100, "quantity": 0 },
      { "id": 2, "name": "Concert B", "description": "Live concert event B", "isVIP": false, "count": 50, "price": 100, "quantity": 0 },
    ];

    const wrapper = mount(AdminView, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    });

    const ticketCards = wrapper.findAllComponents(TicketCard);
    expect(ticketCards).toHaveLength(2);
    expect(ticketCards[0].props("ticket")).toEqual(ticketStore.tickets[0]);
    expect(ticketCards[1].props("ticket")).toEqual(ticketStore.tickets[1]);
  });

  it("opens the ticket form when 'Create Ticket' button is clicked", async () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    });

    const button = wrapper.find("button"); // Finds the Vuetify button
    expect(button.exists()).toBe(true);

    await button.trigger("click");

    const dialog = wrapper.findComponent(TicketDialog);
    expect(dialog.exists()).toBe(true);
    expect(dialog.props("modelValue")).toBe(true);
  });

  it("closes the ticket form when the dialog emits closeDialog", async () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    });

    const dialog = wrapper.findComponent(TicketDialog);
    expect(dialog.exists()).toBe(true);

    await dialog.vm.$emit("closeDialog");

    expect(wrapper.findComponent(TicketDialog).props("modelValue")).toBe(false);
  });
});
