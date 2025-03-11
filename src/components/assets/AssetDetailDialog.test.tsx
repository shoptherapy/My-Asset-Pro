import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AssetDetailDialog from "./AssetDetailDialog";

// Mock the components that are used in AssetDetailDialog
jest.mock("./AssetActions", () => {
  return function MockAssetActions(props) {
    return (
      <div data-testid="asset-actions">
        <button onClick={props.onEdit} data-testid="edit-button">
          Edit
        </button>
        <button onClick={props.onCheckIn} data-testid="check-in-button">
          Check In
        </button>
        <button onClick={props.onCheckOut} data-testid="check-out-button">
          Check Out
        </button>
        <button
          onClick={props.onScheduleMaintenance}
          data-testid="schedule-maintenance-button"
        >
          Schedule Maintenance
        </button>
        <button onClick={props.onPrint} data-testid="print-button">
          Print
        </button>
      </div>
    );
  };
});

jest.mock("./AssetHistory", () => {
  return function MockAssetHistory() {
    return <div data-testid="asset-history">Asset History</div>;
  };
});

jest.mock("./AssetPrintDialog", () => {
  return function MockAssetPrintDialog(props) {
    return (
      <div data-testid="asset-print-dialog">
        <button onClick={props.onClose} data-testid="close-print-dialog">
          Close
        </button>
      </div>
    );
  };
});

describe("AssetDetailDialog", () => {
  const mockOnClose = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnCheckIn = jest.fn();
  const mockOnCheckOut = jest.fn();
  const mockOnScheduleMaintenance = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders asset details correctly", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
      />,
    );

    // Check if asset details are displayed
    expect(screen.getByText("Dell XPS 15 Laptop")).toBeInTheDocument();
    expect(screen.getByText("ID: ASSET-001")).toBeInTheDocument();
    expect(screen.getByText("Computer")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
      />,
    );

    fireEvent.click(screen.getByTestId("edit-button"));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test("calls onCheckIn when check in button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
        asset={{
          id: "ASSET-001",
          name: "Dell XPS 15 Laptop",
          type: "Computer",
          status: "in-use",
          serialNumber: "XPS15-9570-78901",
          purchaseDate: "2022-05-15",
          location: "Main Office - Floor 2",
        }}
      />,
    );

    fireEvent.click(screen.getByTestId("check-in-button"));
    expect(mockOnCheckIn).toHaveBeenCalled();
  });

  test("calls onCheckOut when check out button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
        asset={{
          id: "ASSET-001",
          name: "Dell XPS 15 Laptop",
          type: "Computer",
          status: "available",
          serialNumber: "XPS15-9570-78901",
          purchaseDate: "2022-05-15",
          location: "Main Office - Floor 2",
        }}
      />,
    );

    fireEvent.click(screen.getByTestId("check-out-button"));
    expect(mockOnCheckOut).toHaveBeenCalled();
  });

  test("calls onScheduleMaintenance when schedule maintenance button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
      />,
    );

    fireEvent.click(screen.getByTestId("schedule-maintenance-button"));
    expect(mockOnScheduleMaintenance).toHaveBeenCalled();
  });

  test("opens print dialog when print button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
      />,
    );

    fireEvent.click(screen.getByTestId("print-button"));
    expect(screen.getByTestId("asset-print-dialog")).toBeInTheDocument();
  });

  test("closes print dialog when close button is clicked", () => {
    render(
      <AssetDetailDialog
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onCheckIn={mockOnCheckIn}
        onCheckOut={mockOnCheckOut}
        onScheduleMaintenance={mockOnScheduleMaintenance}
      />,
    );

    // Open print dialog
    fireEvent.click(screen.getByTestId("print-button"));
    expect(screen.getByTestId("asset-print-dialog")).toBeInTheDocument();

    // Close print dialog
    fireEvent.click(screen.getByTestId("close-print-dialog"));
    expect(screen.queryByTestId("asset-print-dialog")).not.toBeInTheDocument();
  });
});
